import { CheckIcon } from "@chakra-ui/icons";
import {
    Button,
    Flex,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { getActiveTabURL } from "../utils";
import Navbar from "./Navbar";

interface RedditPageProps {
    selectedIcon: string;
    setSelectedIcon: (value: string) => void;
    data: any;
    setData: (e: any) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const RedditPage: React.FC<RedditPageProps> = ({
    selectedIcon,
    setSelectedIcon,
    data,
    setData,
    loading,
    setLoading,
}) => {
    function getRandomNumber(min: any, max: any) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomOperator() {
        const operators = ["+", "-", "*"];
        return operators[Math.floor(Math.random() * operators.length)];
    }

    function performBinaryOperation(a: any, b: any, operator: any) {
        switch (operator) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            default:
                throw new Error("Invalid operator.");
        }
    }

    const generateNewQuestion = () => {
        setNum1(getRandomNumber(1, 100));
        setNum2(getRandomNumber(1, 100));
        setOperator(getRandomOperator());
        setUserAnswer("");
        setMessage("");
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [type, setType] = useState(1);
    const [question, setQuestion] = useState(0);
    const [num1, setNum1] = useState(getRandomNumber(1, 100));
    const [num2, setNum2] = useState(getRandomNumber(1, 100));
    const [operator, setOperator] = useState(getRandomOperator());
    const [userAnswer, setUserAnswer] = useState("");
    const [message, setMessage] = useState("");

    const correctAnswer = performBinaryOperation(num1, num2, operator);
    const checkAnswer = () => {
        if (parseFloat(userAnswer) === correctAnswer) {
            setQuestion(0);
            if (type === 1) {
                data.siteData[2].settings.block =
                    !data.siteData[2].settings.block;
                sendData(data);
                onClose();
            }
            if (type === 2) {
                data.siteData[2].settings.comments =
                    !data.siteData[2].settings.comments;
                hideRedditComments(data);
                onClose();
            }
            if (type === 3) {
                data.siteData[2].settings.front =
                    !data.siteData[2].settings.front;
                hideRedditFront(data);
                onClose();
            }
            if (type === 4) {
                data.siteData[2].settings["r/popular"] =
                    !data.siteData[2].settings["r/popular"];
                sendData(data);
                onClose();
            }
            if (type === 5) {
                data.siteData[2].settings["r/all"] =
                    !data.siteData[2].settings["r/all"];
                sendData(data);
                onClose();
            }
            if (type === 6) {
                data.siteData[2].settings["r/af"] =
                    !data.siteData[2].settings["r/af"];
                sendData(data);
                onClose();
            }
            if (type === 7) {
                data.siteData[2].settings.nsfw =
                    !data.siteData[2].settings.nsfw;
                hideRedditNSFW(data);
                onClose();
            }
        } else {
            setMessage(`Incorrect`);
        }
    };
    const sendData = async (data: any) => {
        const sendData = { action: "storeData", data: data };
        await chrome.runtime.sendMessage(sendData, () => {
            setData(data);
            setLoading(!loading);
        });
    };
    const hideRedditComments = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "hideRedditComments",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[2].settings.comments,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };
    const hideRedditFront = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "hideRedditFront",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[2].settings.front,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };
    const hideRedditNSFW = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "hideRedditNSFW",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[2].settings.nsfw,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };

    return (
        <div className="redditPage">
            <Navbar
                data={data}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
            />
            <div className="facebookCont">
                <div className="textWrapper">
                    <span className="pageText">Block Reddit</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[2].settings.block}
                                onChange={() => {
                                    setType(1);
                                    if (
                                        data.siteData[2].settings.block &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[2].settings.block =
                                            !data.siteData[2].settings.block;
                                        sendData(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Hide comments</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[2].settings.comments}
                                onChange={() => {
                                    setType(2);
                                    if (
                                        data.siteData[2].settings.comments &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[2].settings.comments =
                                            !data.siteData[2].settings.comments;
                                        hideRedditComments(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Hide Front page feed</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[2].settings.front}
                                onChange={() => {
                                    setType(3);
                                    if (
                                        data.siteData[2].settings.front &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[2].settings.front =
                                            !data.siteData[2].settings.front;
                                        hideRedditFront(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Block r/popular</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[2].settings["r/popular"]}
                                onChange={() => {
                                    setType(4);
                                    if (
                                        data.siteData[2].settings[
                                            "r/popular"
                                        ] &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[2].settings["r/popular"] =
                                            !data.siteData[2].settings[
                                                "r/popular"
                                            ];
                                        sendData(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Block r/all</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[2].settings["r/all"]}
                                onChange={() => {
                                    setType(5);
                                    if (
                                        data.siteData[2].settings["r/all"] &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[2].settings["r/all"] =
                                            !data.siteData[2].settings["r/all"];
                                        sendData(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Block r/interestingasfuck</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[2].settings["r/af"]}
                                onChange={() => {
                                    setType(6);
                                    if (
                                        data.siteData[2].settings["r/af"] &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[2].settings["r/af"] =
                                            !data.siteData[2].settings["r/af"];
                                        sendData(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Block NSFW subreddit</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[2].settings.nsfw}
                                onChange={() => {
                                    setType(7);
                                    if (
                                        data.siteData[2].settings.nsfw &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[2].settings.nsfw =
                                            !data.siteData[2].settings.nsfw;
                                        hideRedditNSFW(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} size="xs">
                <ModalOverlay />
                <ModalContent>
                    <ModalBody backgroundColor="rgb(244, 250, 239)">
                        {question === 0 ? (
                            <Flex justifyContent="center" width="full">
                                <Text
                                    justifySelf="center"
                                    alignSelf="center"
                                    textAlign="center"
                                    fontSize={"lg"}
                                    paddingY={1}
                                    fontWeight="semibold"
                                >
                                    Are you sure you want to do this?
                                </Text>
                            </Flex>
                        ) : question === 1 ? (
                            <Flex direction="column" width="full">
                                <form
                                    className="flex flex-row mt-3 justify-center w-full"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        checkAnswer();
                                    }}
                                >
                                    <HStack
                                        fontSize="2xl"
                                        fontWeight="semibold"
                                        marginRight="2"
                                    >
                                        <Text>{num1}</Text>
                                        <Text>{operator}</Text>
                                        <Text>{num2}</Text>
                                        <Text>=</Text>
                                    </HStack>
                                    <Input
                                        value={userAnswer}
                                        type="number"
                                        onChange={(e) =>
                                            setUserAnswer(e.target.value)
                                        }
                                        required
                                        width="100px"
                                        borderColor={message ? "red.500" : ""}
                                        backgroundColor={
                                            message === ""
                                                ? "#F0FFE3"
                                                : "rgb(237 129 129 / 20%)"
                                        }
                                        maxWidth="60px"
                                        boxShadow="0 1px 5px 1px #0000001a inset"
                                        outline="none"
                                        border="none"
                                    />
                                    <Button
                                        size="sm"
                                        type="submit"
                                        marginLeft="2"
                                        backgroundColor="#B3EA9F"
                                        borderWidth="4px"
                                        borderColor="#76B94666"
                                        boxShadow="0px 0px 5px 1px #0000006e"
                                        rounded="lg"
                                        padding="0"
                                        _hover={{
                                            backgroundColor: "#B3EA9F",
                                        }}
                                        marginTop="4px"
                                    >
                                        <CheckIcon color="white" />
                                    </Button>
                                </form>
                                <Text marginLeft="135px" color="red.500">
                                    {message}
                                </Text>
                            </Flex>
                        ) : (
                            <Flex
                                width="full"
                                justifyContent="center"
                                textAlign="center"
                                direction="column"
                                gap={1}
                            >
                                <Text fontSize="lg" fontWeight="semibold">
                                    Congrulations!
                                </Text>
                                <Text fontSize="lg" paddingBottom={1}>
                                    You are more powerful than the distraction.
                                </Text>
                            </Flex>
                        )}
                    </ModalBody>

                    <ModalFooter backgroundColor="#F4FAEF">
                        <Flex width="full" justifyContent="center" gap="5">
                            {question === 0 ? (
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    backgroundColor="#F4FAEF"
                                    boxShadow="0 0 3px 7px #76b9464a inset"
                                    _focus={{
                                        outline: "none",
                                        boxShadow:
                                            "0 0 3px 7px #76b9464a inset",
                                    }}
                                    rounded="xl"
                                    _hover={{
                                        backgroundColor: "#F4FAEF",
                                    }}
                                    onClick={() => {
                                        setQuestion(1);
                                    }}
                                    textColor={"black"}
                                    marginRight={3}
                                    width="100px"
                                >
                                    Yes
                                </Button>
                            ) : null}

                            {question === 2 ? (
                                <Button
                                    size="sm"
                                    backgroundColor="#F4FAEF"
                                    boxShadow="0 0 3px 7px #76b9464a inset"
                                    _focus={{
                                        outline: "none",
                                        boxShadow:
                                            "0 0 3px 7px #76b9464a inset",
                                    }}
                                    rounded="xl"
                                    _hover={{
                                        backgroundColor: "#F4FAEF",
                                    }}
                                    onClick={() => {
                                        onClose();
                                        setQuestion(0);
                                    }}
                                    width="100px"
                                >
                                    Okay
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    backgroundColor="#F4FAEF"
                                    boxShadow="0 0 3px 7px #76b9464a inset"
                                    _focus={{
                                        outline: "none",
                                        boxShadow:
                                            "0 0 3px 7px #76b9464a inset",
                                    }}
                                    rounded="xl"
                                    _hover={{
                                        backgroundColor: "#F4FAEF",
                                    }}
                                    onClick={() => {
                                        setQuestion(2);
                                    }}
                                    justifySelf="end!important"
                                    width="100px"
                                >
                                    No
                                </Button>
                            )}
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default RedditPage;
