import {
    AddIcon,
    CheckIcon,
    EditIcon,
    InfoOutlineIcon,
    MinusIcon,
    SmallCloseIcon,
} from "@chakra-ui/icons";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Button,
    Flex,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "./Navbar";
import "./Settings.css";

interface SettingsPageProps {
    selectedIcon: string;
    setSelectedIcon: (value: string) => void;
    data: any;
    setData: (e: any) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
    selectedIcon,
    setSelectedIcon,
    data,
    setData,
    loading,
    setLoading,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const sendData = async (data: any) => {
        const sendData = { action: "storeData", data: data };
        await chrome.runtime.sendMessage(sendData, () => {
            setData(data);
            setLoading(!loading);
        });
    };
    const [urlAdd, setURLAdd] = useState("");
    const [urlAdd1, setURLAdd1] = useState(
        data.siteData[5].settings["custom-url"]
    );
    const [urlList, setUrlList] = useState(
        data.siteData[5].settings.customSites.urlList
    );
    const [mhd, setMHD] = useState(
        data.siteData[5].settings.disableHours["m/h/d"]
    );
    const [time, setTime] = useState(
        data.siteData[5].settings.disableHours.value
    );
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [tc, setTC] = useState(data.siteData[5].settings.disableHours.active)
    const [loading4, setLoading4] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alert1, setAlert1] = useState(false);
    const [from, setFrom] = useState(
        data.siteData[5].settings["focus-mode"].from
    );
    const [until, setUntil] = useState(
        data.siteData[5].settings["focus-mode"].to
    );

    const removerURL = async (index: number) => {
        setLoading4(true);
        await data.siteData[5].settings.customSites.urlList.splice(index, 1);
        await setUrlList(data.siteData[5].settings.customSites.urlList);
        await sendData(data);
        setTimeout(() => {
            setLoading4(false);
        }, 500);
    };

    const addURLList = async (url: string) => {
        setLoading3(true);
        if (!url.endsWith("/")) {
            url = url + "/";
        }
        await data.siteData[5].settings.customSites.urlList.push(url);
        await setUrlList(data.siteData[5].settings.customSites.urlList);
        await sendData(data);
        setTimeout(() => {
            setLoading3(false);
        }, 500);
    };
    return (
        <div className="settingsPage">
            <Navbar
                data={data}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
            />
            <div className="facebookCont1">
                <Flex direction="column" textAlign="center">
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        gap="2"
                        position="relative"
                    >
                        <Text
                            position="relative"
                            fontSize="md"
                            fontWeight="semibold"
                            marginRight="15px"
                        >
                            Focus mode
                            <Tooltip
                                label="It will enable all filters. Select time to turn it on"
                                fontSize="md"
                                hasArrow
                                bg="gray.300"
                                color="black"
                                aria-label="A tooltip"
                                placement="bottom"
                            >
                                <InfoOutlineIcon
                                    alignSelf="start"
                                    position="absolute"
                                    top="0"
                                    width="0.7em"
                                />
                            </Tooltip>
                        </Text>
                        <span>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    disabled={until && from ? false : true}
                                    checked={
                                        data.siteData[5].settings["focus-mode"]
                                            .active
                                    }
                                    onChange={(e) => {
                                        data.siteData[5].settings[
                                            "focus-mode"
                                        ].active =
                                            !data.siteData[5].settings[
                                                "focus-mode"
                                            ].active;
                                        sendData(data);
                                    }}
                                />
                                <span className="slider"></span>
                            </label>
                        </span>
                    </Flex>
                    <Flex justifyContent="space-evenly" marginY="2">
                        <Flex direction="column" width="150px">
                            <Text fontSize="md" alignSelf="start">
                                From
                            </Text>
                            <Input
                                backgroundColor="#F0F0F0"
                                type="time"
                                placeholder="from"
                                value={from}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                    data.siteData[5].settings[
                                        "focus-mode"
                                    ].from = e.target.value;
                                    sendData(data);
                                }}
                                size="sm"
                            />
                        </Flex>
                        <Flex direction="column" width="150px">
                            <Text fontSize="md" alignSelf="start">
                                Until
                            </Text>
                            <Input
                                backgroundColor="#F0F0F0"
                                type="time"
                                placeholder="until"
                                value={until}
                                onChange={(e) => {
                                    setUntil(e.target.value);
                                    data.siteData[5].settings["focus-mode"].to =
                                        e.target.value;
                                    sendData(data);
                                }}
                                disabled={from === "" ? true : false}
                                size="sm"
                            />
                        </Flex>
                    </Flex>
                </Flex>
                <div className="textWrapper">
                    <span className="pageText">Pause All FIlter</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={data.siteData[5].settings.disable}
                                onChange={() => {
                                    data.siteData[5].settings.disable =
                                        !data.siteData[5].settings.disable;
                                    sendData(data);
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Pause for 10 Minutes</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={
                                    data.siteData[5].settings["disable-10"]
                                        .value
                                }
                                onChange={() => {
                                    data.siteData[5].settings[
                                        "disable-10"
                                    ].value =
                                        !data.siteData[5].settings["disable-10"]
                                            .value;
                                    data.siteData[5].settings[
                                        "disable-10"
                                    ].from = new Date();
                                    sendData(data);
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Block List</span>
                    <Flex alignItems="center" gap="2">
                        <Button
                            onClick={onOpen}
                            size="xs"
                            backgroundColor="#F4FAEF"
                            borderWidth="4px"
                            borderColor="#76B94666"
                            boxShadow="0px 0px 5px 1px #0000006e"
                            rounded="3xl"
                            _hover={{
                                backgroundColor: "#F4FAEF",
                            }}
                            fontSize="0.9rem"
                        >
                            <EditIcon /> &nbsp; Domains to block
                        </Button>

                        {alert1 ? <Alert status='error' position="absolute" bottom="15px" left="25px" right="25px" width="auto" style={{ zIndex: "10000" }}>
                            <AlertIcon />
                            <AlertDescription>Cannot add this URL.</AlertDescription>
                        </Alert> : null}
                        <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                            scrollBehavior="inside"
                            size="xs"
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader
                                    backgroundColor="#F4FAEF"
                                    fontSize="lg"
                                >
                                    Blocked URLs
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody
                                    backgroundColor="#F4FAEF"
                                    minHeight="200px"
                                >
                                    <Flex direction="column" gap={4}>
                                        {urlList.map(
                                            (url: any, index: number) => {
                                                return (
                                                    <Flex
                                                        justifyContent="space-between"
                                                        width="full"
                                                    >
                                                        <InputGroup
                                                            size="sm"
                                                            width="350px"
                                                        >
                                                            <Input
                                                                backgroundColor={
                                                                    "#F0F0F0"
                                                                }
                                                                type="url"
                                                                value={url}
                                                                contentEditable={
                                                                    false
                                                                }
                                                                borderRightRadius="full"
                                                            />
                                                        </InputGroup>
                                                        <Button
                                                            size="sm"
                                                            marginLeft="2"
                                                            isLoading={loading4}
                                                            shadow="inner"

                                                            boxShadow={
                                                                "0px 0px 1px 1px #0000001c"
                                                            }
                                                            rounded="xl"
                                                            padding="0"
                                                            textColor="green"
                                                            backgroundColor={
                                                                "#F0FFE3"
                                                            }
                                                            _hover={{
                                                                backgroundColor:
                                                                    "#F0FFE3",
                                                            }}
                                                            onClick={() => {
                                                                removerURL(
                                                                    index
                                                                );
                                                            }}
                                                            transform="scale(0.9)"
                                                        >
                                                            <MinusIcon color="green" />
                                                        </Button>
                                                    </Flex>
                                                );
                                            }
                                        )}
                                    </Flex>
                                </ModalBody>
                                <ModalFooter
                                    borderTopWidth="2px"
                                    backgroundColor="#CEE8BCB2"
                                    justifyContent="start"
                                >
                                    <form
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (urlAdd.includes("unplugnation.org") || urlAdd.includes(data.siteData[5].settings["custom-url"])) {
                                                setAlert1(true);
                                                setTimeout(() => {
                                                    setAlert1(false);
                                                }, 1500)
                                            }
                                            else {
                                                addURLList(urlAdd);
                                                setURLAdd("");
                                            }
                                        }}
                                    >
                                        <InputGroup size="sm" width="350px">
                                            <Input
                                                placeholder="https://www.google.com/"
                                                backgroundColor={"#F0FFE3"}
                                                type="url"
                                                value={urlAdd}
                                                onChange={(e) => {
                                                    setURLAdd(e.target.value);
                                                }}
                                                required
                                                borderRightRadius="full"
                                            />
                                        </InputGroup>
                                        <Button
                                            size="sm"
                                            type="submit"
                                            marginLeft="2"
                                            shadow="inner"
                                            isLoading={loading3}
                                            boxShadow={
                                                "0px 0px 3px 5px rgb(210 229 193) inset"
                                            }
                                            rounded="xl"
                                            padding="0"
                                            textColor="green"
                                            backgroundColor={"#F0FFE3"}
                                            _hover={{
                                                backgroundColor: "#F0FFE3",
                                            }}
                                        >
                                            <AddIcon color="green" />
                                        </Button>
                                    </form>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <span>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={
                                        data.siteData[5].settings.customSites
                                            .active
                                    }
                                    onChange={() => {
                                        data.siteData[5].settings.customSites.active =
                                            !data.siteData[5].settings
                                                .customSites.active;
                                        sendData(data);
                                    }}
                                />
                                <span className="slider"></span>
                            </label>
                        </span>
                    </Flex>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Default Redirection</span>
                    <form
                        style={{ display: "flex" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (urlAdd1.includes("facebook.com") || urlAdd1.includes("youtube.com") || urlAdd1.includes("twitter.com") || urlAdd1.includes("reddit.com") || data.siteData[5].settings.customSites.urlList.includes(urlAdd1)) {
                                setAlert(true);
                                setTimeout(() => {
                                    setAlert(false)
                                }, 1500);
                            }
                            else {
                                setLoading1(true);
                                data.siteData[5].settings["custom-url"] = urlAdd1;
                                sendData(data);
                                setTimeout(() => {
                                    setLoading1(false);
                                }, 500);
                            }
                        }}
                    >
                        <InputGroup size="sm">
                            <Input
                                placeholder="https://unplugnation.org"
                                backgroundColor={"#F0F0F0"}
                                type="url"
                                required
                                value={urlAdd1}
                                onChange={(e) => {
                                    setURLAdd1(e.target.value);
                                }}
                                width="153px"
                                rounded="xl"
                            />
                        </InputGroup>
                        <Button
                            size="sm"
                            isLoading={loading1}
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
                        >
                            <CheckIcon color="white" />
                        </Button>
                    </form>
                </div>
                {alert ?
                    <Alert status='error' position="absolute" bottom="15px" left="25px" right="25px" width="auto">
                        <AlertIcon />
                        <AlertDescription>Cannot add this URL</AlertDescription>
                    </Alert> : null}
                <div className="textWrapper">
                    <span className="pageText">Self-Control</span>
                    <span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={
                                    data.siteData[5].settings["self-toggle"]
                                }
                                onChange={() => {
                                    data.siteData[5].settings["self-toggle"] =
                                        !data.siteData[5].settings[
                                        "self-toggle"
                                        ];
                                    sendData(data);
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    </span>
                </div>
                <div className="textWrapper">
                    <span className="pageText">Pause for</span>
                    <form
                        style={{ display: "flex" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            setLoading2(true);
                            data.siteData[5].settings.disableHours.value =
                                parseInt(time, 10);
                            data.siteData[5].settings.disableHours.active =
                                true;
                            data.siteData[5].settings.disableHours.from =
                                new Date();
                            data.siteData[5].settings.disableHours["m/h/d"] =
                                mhd ? mhd : "m";
                            sendData(data);
                            setTimeout(() => {
                                setLoading2(false);
                                setTC(true)
                            }, 500);
                        }}
                    >
                        <Input
                            backgroundColor={"#F0F0F0"}
                            type="number"
                            required
                            style={{ textAlign: "center" }}
                            borderLeftRadius="full"
                            size="sm"
                            width="70px"
                            max={100}
                            min={1}
                            value={time}
                            onChange={(e) => {
                                setTime(e.target.value);
                            }}
                            disabled={tc}
                        />
                        <Select
                            size="sm"
                            width="105px"
                            required
                            value={mhd ? mhd : "m"}
                            onChange={(e) => {
                                setMHD(e.target.value);
                            }}
                            disabled={tc}
                        >
                            <option value="m">minutes</option>
                            <option value="h">hours</option>
                            <option value="d">days</option>
                        </Select>
                        {tc ? <Button
                            size="sm"
                            type="submit"
                            marginLeft="2"
                            isLoading={loading2}
                            backgroundColor="red.300"
                            borderWidth="4px"
                            borderColor="red.400"
                            boxShadow="0px 0px 5px 1px #0000006e"
                            rounded="lg"
                            padding="0"
                            _hover={{
                                backgroundColor: "red.300",
                            }}
                            onClick={() => {
                                setLoading2(true);
                                data.siteData[5].settings.disableHours.value = "";
                                data.siteData[5].settings.disableHours.active = false;
                                data.siteData[5].settings.disableHours["m/h/d"] = "m";
                                setMHD("m")
                                setTime("");
                                sendData(data);
                                setTimeout(() => {
                                    setLoading2(false);
                                    setTC(false)
                                }, 500);
                            }}
                        >
                            <SmallCloseIcon color="white" className="!w-2/3" />

                        </Button> : <Button
                            size="sm"
                            type="submit"
                            marginLeft="2"
                            isLoading={loading2}
                            backgroundColor="#B3EA9F"
                            borderWidth="4px"
                            borderColor="#76B94666"
                            boxShadow="0px 0px 5px 1px #0000006e"
                            rounded="lg"
                            padding="0"
                            _hover={{
                                backgroundColor: "#B3EA9F",
                            }}
                        >
                            <CheckIcon color="white" />
                        </Button>}

                    </form>
                </div>
                <Flex
                    direction="row"
                    justifyContent="space-between"
                    paddingTop="2"
                >
                    <button className="welcomeButton" type="submit" onClick={()=>{
                        window.open("https://chrome.google.com/webstore/detail/unplugged-free-website-bl/ffnajfpjcffegihbldmibiaoooapkgkl/reviews")
                    }}>
                        Rate this plugin
                    </button>
                    <a
                        href="mailto:himu@unplugnation.org"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className="welcomeButton" type="submit">
                            Feedback
                        </button>
                    </a>
                </Flex>
            </div>
        </div>
    );
};

export default SettingsPage;
