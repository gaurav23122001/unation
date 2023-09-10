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
import "./Youtube.css";

interface YoutubePageProps {
    selectedIcon: string;
    setSelectedIcon: (value: string) => void;
    data: any;
    setData: (e: any) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const YoutubePage: React.FC<YoutubePageProps> = ({
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
                data.siteData[1].settings.block =
                    !data.siteData[1].settings.block;
                sendData(data);
                onClose();
            }
            if (type === 2) {
                data.siteData[1].settings.recom =
                    !data.siteData[1].settings.recom;
                hideYTRecommendation(data);
                onClose();
            }
            if (type === 3) {
                data.siteData[1].settings.redirect =
                    !data.siteData[1].settings.redirect;
                ytRedirectSubscription(data);
                onClose();
            }
            if (type === 4) {
                data.siteData[1].settings.sideBar =
                    !data.siteData[1].settings.sideBar;
                hideYTSideBar(data);
                onClose();
            }
            if (type === 5) {
                data.siteData[1].settings.comment =
                    !data.siteData[1].settings.comment;
                hideYTComments(data);
                onClose();
            }
            if (type === 6) {
                data.siteData[1].settings.suggestions =
                    !data.siteData[1].settings.suggestions;
                hideYTSuggestions(data);
                onClose();
            }
            if (type === 7) {
                data.siteData[1].settings.shorts =
                    !data.siteData[1].settings.shorts;
                hideYTShorts(data);
                onClose();
            }
        } else {
            setMessage(`Incorrect`);
        }
    };
    const [thumbNail, setThumbnail] = useState(1);
    const sendData = async (data: any) => {
        const sendData = { action: "storeData", data: data };
        await chrome.runtime.sendMessage(sendData, () => {
            setData(data);
            setLoading(!loading);
        });
    };
    const hideYTRecommendation = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "hideYtRecommendation",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[1].settings.recom,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };
    const hideYTSideBar = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "hideYtSideBar",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[1].settings.sideBar,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };
    const hideYTComments = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "hideYtComments",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[1].settings.comment,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };
    const hideYTShorts = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "hideYtShorts",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[1].settings.shorts,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };
    const hideYTSuggestions = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "hideYtSuggestions",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[1].settings.suggestions,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };
    const hideYTThumbnail = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "hideYtThumbnail",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[1].settings.thumbnail,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };
    const ytRedirectSubscription = async (data: any) => {
        const activeTab = await getActiveTabURL();
        const message = {
            action: "ytRedirectSubs",
            tabId: activeTab.id,
            url: activeTab.url,
            data: data.siteData[1].settings.redirect,
            disable: data.siteData[5].settings.disable,
            disable10: data.siteData[5].settings["disable-10"].value,
            pause: data.siteData[5].settings.disableHours.active,
        };
        await chrome.runtime.sendMessage(message, () => {
            sendData(data);
        });
    };

    return (
        <div className="youtubePage">
            <Navbar
                data={data}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
            />
            <div className="facebookCont">
                <div className="textWrapper">
                    <span className="pageText">Block YouTube</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[1].settings.block}
                                onChange={() => {
                                    setType(1);
                                    if (
                                        data.siteData[1].settings.block &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[1].settings.block =
                                            !data.siteData[1].settings.block;
                                        sendData(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Hide Recommendations</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[1].settings.recom}
                                onChange={() => {
                                    setType(2);
                                    if (
                                        data.siteData[1].settings.recom &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[1].settings.recom =
                                            !data.siteData[1].settings.recom;
                                        hideYTRecommendation(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">
                        Force redirect to my subscriptions
                    </span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[1].settings.redirect}
                                onChange={() => {
                                    setType(3);
                                    if (
                                        data.siteData[1].settings.redirect &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[1].settings.redirect =
                                            !data.siteData[1].settings.redirect;
                                        ytRedirectSubscription(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Hide Sidebar</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[1].settings.sideBar}
                                onChange={() => {
                                    setType(4);
                                    if (
                                        data.siteData[1].settings.sideBar &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[1].settings.sideBar =
                                            !data.siteData[1].settings.sideBar;
                                        hideYTSideBar(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Hide Comments</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[1].settings.comment}
                                onChange={() => {
                                    setType(5);
                                    if (
                                        data.siteData[1].settings.comment &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[1].settings.comment =
                                            !data.siteData[1].settings.comment;
                                        hideYTComments(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Hide Up Next Suggestions</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[1].settings.suggestions}
                                onChange={() => {
                                    setType(6);
                                    if (
                                        data.siteData[1].settings.suggestions &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[1].settings.suggestions =
                                            !data.siteData[1].settings
                                                .suggestions;
                                        hideYTSuggestions(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Hide Shorts</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[1].settings.shorts}
                                onChange={() => {
                                    setType(7);
                                    if (
                                        data.siteData[1].settings.shorts &&
                                        data.siteData[5].settings["self-toggle"]
                                    ) {
                                        onOpen();
                                        generateNewQuestion();
                                    } else {
                                        data.siteData[1].settings.shorts =
                                            !data.siteData[1].settings.shorts;
                                        hideYTShorts(data);
                                    }
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="pageText1">Blur/Hide Thumbnails</div>
                <div className="thumbnailContainer">
                    <span
                        className={`thumbnailButton ${
                            data.siteData[1].settings.thumbnail === 0
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => {
                            setThumbnail(1);
                            data.siteData[1].settings.thumbnail = 0;
                            hideYTThumbnail(data);
                        }}
                    >
                        Show
                    </span>
                    <span
                        className={`thumbnailButton ${
                            data.siteData[1].settings.thumbnail === 1
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => {
                            setThumbnail(2);
                            data.siteData[1].settings.thumbnail = 1;
                            hideYTThumbnail(data);
                        }}
                    >
                        Blur
                    </span>
                    <span
                        className={`thumbnailButton ${
                            data.siteData[1].settings.thumbnail === 2
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => {
                            setThumbnail(3);
                            data.siteData[1].settings.thumbnail = 2;
                            hideYTThumbnail(data);
                        }}
                    >
                        Hide
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

export default YoutubePage;
