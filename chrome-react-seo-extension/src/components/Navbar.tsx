import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
    selectedIcon: string;
    setSelectedIcon: (value: string) => void;
    data: any;
}

const Navbar: React.FC<NavbarProps> = ({
    selectedIcon,
    setSelectedIcon,
    data,
}) => {
    const [open, setOpen] = useState(false);

    const history = useHistory();
    return (
        <nav>
            <div className="navbarContainer">
                <span
                    className={`iconContainer ${selectedIcon === "icon1" ? "selected" : ""
                        } ${data.siteData[5].settings.disable ||
                            data.siteData[5].settings["disable-10"].value ||
                            data.siteData[5].settings.disableHours.active
                            ? "inactive"
                            : ""
                        }`}
                    onClick={() => {
                        setSelectedIcon("icon1");
                        history.push("/facebook");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="27"
                        viewBox="0 0 20 37"
                        fill="none"
                        className="scale-90"
                    >
                        <path
                            d="M12.8333 21.0821H17.4167L19.25 13.8583H12.8333V10.2463C12.8333 8.38616 12.8333 6.63437 16.5 6.63437H19.25V0.566313C18.6523 0.488656 16.3955 0.313477 14.0122 0.313477C9.03467 0.313477 5.5 3.30597 5.5 8.80154V13.8583H0V21.0821H5.5V36.4329H12.8333V21.0821Z"
                            fill="#0039AF"
                        />
                    </svg>
                </span>
                <span
                    className={`iconContainer ${selectedIcon === "icon2" ? "selected" : ""
                        } ${data.siteData[5].settings.disable ||
                            data.siteData[5].settings["disable-10"].value ||
                            data.siteData[5].settings.disableHours.active
                            ? "inactive"
                            : ""
                        }`}
                    onClick={() => {
                        setSelectedIcon("icon2");
                        history.push("/youtube");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="25"
                        viewBox="0 0 45 31"
                        fill="none"
                        className="scale-90"
                    >
                        <g clip-path="url(#clip0_194_1177)">
                            <path
                                d="M43.1152 4.83514C42.8623 3.90058 42.369 3.04858 41.6844 2.36397C40.9998 1.67936 40.1479 1.18603 39.2133 0.9331C35.7919 0 22.0221 0 22.0221 0C22.0221 0 8.25154 0.0282444 4.83018 0.961344C3.89561 1.21429 3.04362 1.70764 2.35904 2.39229C1.67445 3.07693 1.18117 3.92897 0.928311 4.86356C-0.106572 10.9427 -0.508023 20.2058 0.956728 26.0417C1.20961 26.9763 1.70291 27.8283 2.38749 28.5129C3.07207 29.1975 3.92405 29.6908 4.85859 29.9438C8.27996 30.8769 22.0502 30.8769 22.0502 30.8769C22.0502 30.8769 35.8202 30.8769 39.2414 29.9438C40.176 29.6909 41.028 29.1975 41.7126 28.5129C42.3972 27.8283 42.8905 26.9763 43.1434 26.0417C44.235 19.954 44.5713 10.6966 43.1152 4.83514Z"
                                fill="#FF0000"
                            />
                            <path
                                d="M17.6396 22.0546L29.0628 15.4382L17.6396 8.82178V22.0546Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_194_1177">
                                <rect width="44.09" height="31" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
                <span
                    className={`iconContainer ${selectedIcon === "icon3" ? "selected" : ""
                        } ${data.siteData[5].settings.disable ||
                            data.siteData[5].settings["disable-10"].value ||
                            data.siteData[5].settings.disableHours.active
                            ? "inactive"
                            : ""
                        }`}
                    onClick={() => {
                        setSelectedIcon("icon3");
                        history.push("/reddit");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 44 44"
                        fill="none"
                        className="scale-90"
                    >
                        <g clip-path="url(#clip0_194_1180)">
                            <path
                                d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
                                fill="#FF4500"
                            />
                            <path
                                d="M36.6355 22.2098C36.6355 20.4264 35.1933 19.01 33.4358 19.01C32.6055 19.0089 31.8069 19.3284 31.2065 19.9019C29.0034 18.328 25.987 17.3054 22.63 17.1742L24.0985 10.3025L28.872 11.3251C28.9247 12.5317 29.9211 13.5023 31.1541 13.5023C32.4129 13.5023 33.4358 12.4796 33.4358 11.2201C33.4358 9.9613 32.4131 8.93848 31.1541 8.93848C30.2624 8.93848 29.4752 9.46304 29.1081 10.2238L23.7841 9.09591C23.6267 9.06945 23.4692 9.09591 23.3642 9.17463C23.2331 9.25335 23.1545 9.38432 23.1286 9.54176L21.502 17.2002C18.0925 17.3054 15.0236 18.328 12.7944 19.9282C12.194 19.3547 11.3953 19.0353 10.565 19.0365C8.78148 19.0365 7.36523 20.4787 7.36523 22.2363C7.36523 23.5475 8.15191 24.6489 9.2538 25.1477C9.20029 25.4683 9.17395 25.793 9.17508 26.1181C9.17508 31.0485 14.9191 35.0618 22.0006 35.0618C29.0822 35.0618 34.8262 31.0749 34.8262 26.1181C34.826 25.793 34.7997 25.4685 34.7475 25.1477C35.8489 24.6489 36.6355 23.521 36.6355 22.2098ZM14.6565 24.4914C14.6565 23.2326 15.6792 22.2098 16.9387 22.2098C18.1975 22.2098 19.2203 23.2325 19.2203 24.4914C19.2203 25.7504 18.1977 26.7736 16.9387 26.7736C15.6793 26.7994 14.6565 25.7504 14.6565 24.4914ZM27.4298 30.5502C25.8561 32.1241 22.866 32.2291 22.0006 32.2291C21.1089 32.2291 18.1189 32.0976 16.571 30.5502C16.3354 30.3142 16.3354 29.9469 16.571 29.7109C16.8072 29.4753 17.1743 29.4753 17.4105 29.7109C18.4073 30.7078 20.5056 31.0485 22.0006 31.0485C23.4957 31.0485 25.6199 30.7076 26.5903 29.7109C26.8265 29.4753 27.1936 29.4753 27.4298 29.7109C27.6394 29.9469 27.6394 30.3142 27.4298 30.5502ZM27.0099 26.7996C25.7509 26.7996 24.7282 25.7769 24.7282 24.5179C24.7282 23.2589 25.7509 22.2363 27.0099 22.2363C28.2692 22.2363 29.2918 23.2589 29.2918 24.5179C29.2918 25.7503 28.2692 26.7996 27.0099 26.7996Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_194_1180">
                                <rect width="44" height="44" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
                <span
                    className={`iconContainer ${selectedIcon === "icon4" ? "selected" : ""
                        } ${data.siteData[5].settings.disable ||
                            data.siteData[5].settings["disable-10"].value ||
                            data.siteData[5].settings.disableHours.active
                            ? "inactive"
                            : ""
                        }`}
                    onClick={() => {
                        setSelectedIcon("icon4");
                        history.push("/twitter");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 44 44"
                        fill="none"
                        className="scale-90"
                    >
                        <path
                            d="M37.905 14.2151C37.9294 14.5733 37.9294 14.9312 37.9294 15.2926C37.9294 26.3023 29.6741 39 14.5794 39V38.9937C10.12 39 5.7531 37.7032 2 35.258C2.64844 35.3373 3.3 35.3769 3.95312 35.3785C7.6491 35.3815 11.2388 34.1229 14.1453 31.805C12.4328 31.7721 10.7732 31.1967 9.39857 30.1593C8.02393 29.1218 7.00297 27.6742 6.47844 26.0187C7.70875 26.2598 8.97625 26.21 10.1838 25.8749C6.355 25.0897 3.60063 21.6744 3.60063 17.7081V17.6024C4.74197 18.248 6.01939 18.6057 7.32531 18.6453C3.71875 16.1984 2.60781 11.3278 4.78531 7.52012C6.84559 10.0941 9.41612 12.1993 12.3299 13.699C15.2438 15.1986 18.4357 16.0592 21.6984 16.2248C21.3732 14.803 21.4214 13.3194 21.838 11.9224C22.2547 10.5254 23.0253 9.26391 24.0728 8.26415C27.3781 5.1094 32.5766 5.27122 35.6834 8.62553C37.5213 8.25708 39.2838 7.57293 40.895 6.60254C40.2823 8.53184 39.0004 10.1695 37.2875 11.2111C38.9143 11.0163 40.5029 10.5741 42 9.89911C40.8987 11.5736 39.512 13.0352 37.905 14.2151Z"
                            fill="#007CD0"
                        />
                    </svg>
                </span>
                <span
                    className={`iconContainer ${selectedIcon === "icon5" ? "selected" : ""
                        } ${data.siteData[5].settings.disable ||
                            data.siteData[5].settings["disable-10"].value ||
                            data.siteData[5].settings.disableHours.active
                            ? "inactive"
                            : ""
                        }`}
                    onClick={() => {
                        setSelectedIcon("icon5");
                        history.push("/explicit");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 38 38"
                        fill="none"
                        className="scale-90"
                    >
                        <path
                            d="M38 18.7164C38 29.0526 29.4928 37.4328 19 37.4328C8.50725 37.4328 0 29.0526 0 18.7164C0 8.38028 8.50725 0 19 0C29.4928 0 38 8.38028 38 18.7164ZM33.25 18.7164C33.2547 15.8008 32.3335 12.9567 30.6153 10.5826L10.7445 30.1584C12.8763 31.651 15.384 32.5368 17.993 32.7189C20.6019 32.901 23.2113 32.3723 25.5355 31.1906C27.8596 30.009 29.8088 28.2201 31.1696 26.0198C32.5303 23.8196 33.2501 21.2928 33.25 18.7164ZM27.2571 7.27445C24.5123 5.35232 21.1651 4.44991 17.8092 4.72726C14.4533 5.0046 11.3056 6.44378 8.92431 8.78955C6.543 11.1353 5.08201 14.2361 4.80047 17.5419C4.51892 20.8477 5.435 24.1449 7.38625 26.8487L27.2571 7.27445Z"
                            fill="#E71F1F"
                        />
                    </svg>
                </span>
                <span
                    className={`iconContainer ${selectedIcon === "icon6" ? "selected" : ""
                        }`}
                    onClick={() => {
                        setSelectedIcon("icon6");
                        history.push("/settings");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        viewBox="0 0 36 37"
                        fill="none"
                        className="scale-90"
                    >
                        <path
                            d="M31.8842 18.5076C31.8842 18.0884 31.8657 17.6875 31.8286 17.2683L35.2719 14.6988C36.0124 14.1521 36.216 13.1315 35.7532 12.3297L32.2914 6.44336C32.0695 6.05735 31.7105 5.76569 31.2833 5.62442C30.8562 5.48314 30.3911 5.50221 29.9774 5.67796L25.9973 7.33633C25.3123 6.86251 24.5904 6.44336 23.8314 6.09711L23.2945 1.88739C23.1834 0.976199 22.3874 0.283691 21.4618 0.283691H14.5567C13.6126 0.283691 12.8166 0.976199 12.7055 1.88739L12.1686 6.09711C11.4096 6.44336 10.6877 6.86251 10.0027 7.33633L6.02258 5.67796C5.17102 5.31348 4.17136 5.64151 3.70855 6.44336L0.246764 12.3479C-0.216042 13.1498 -0.012407 14.1521 0.728083 14.717L4.17136 17.2866C4.09462 18.1049 4.09462 18.9285 4.17136 19.7468L0.728083 22.3164C-0.012407 22.8631 -0.216042 23.8836 0.246764 24.6855L3.70855 30.5718C4.17136 31.3736 5.17102 31.7017 6.02258 31.3372L10.0027 29.6788C10.6877 30.1526 11.4096 30.5718 12.1686 30.918L12.7055 35.1278C12.8166 36.0389 13.6126 36.7315 14.5382 36.7315H21.4433C22.3689 36.7315 23.1649 36.0389 23.276 35.1278L23.8128 30.918C24.5718 30.5718 25.2938 30.1526 25.9788 29.6788L29.9589 31.3372C30.8105 31.7017 31.8101 31.3736 32.2729 30.5718L35.7347 24.6855C36.1975 23.8836 35.9939 22.8813 35.2534 22.3164L31.8101 19.7468C31.8657 19.3276 31.8842 18.9267 31.8842 18.5076ZM18.0741 24.8859C14.5012 24.8859 11.5948 22.0248 11.5948 18.5076C11.5948 14.9904 14.5012 12.1292 18.0741 12.1292C21.6469 12.1292 24.5533 14.9904 24.5533 18.5076C24.5533 22.0248 21.6469 24.8859 18.0741 24.8859Z"
                            fill="#393939"
                        />
                    </svg>
                </span>
                <Button
                    width="22px"
                    backgroundColor="#83C272"
                    height="53px"
                    position="absolute"
                    right="0"
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => {
                        setOpen(!open);
                    }}
                    _hover={{ bgColor: "rgb(179, 234, 159)" }}
                    size="xs"
                >
                    {open ? (
                        <ArrowRightIcon color="white" />
                    ) : (
                        <ArrowLeftIcon color="white" />
                    )}
                </Button>
                <Box
                    position="absolute"
                    right={open ? "40px" : "-170px"}
                    transition="0.7s"
                    boxShadow="0px 0px 5px 1px #0000006e"
                    backgroundColor="#B3EA9F"
                    rounded="lg"
                    borderWidth="4px"
                    borderColor="#76B94666"
                    paddingX={3}
                    cursor="pointer"
                    paddingY="4px"
                    borderStyle="solid"
                    onClick={() => {
                        window.open("https://unplugnation.org/membership");
                    }}
                >
                    Join Community
                </Box>
            </div>
        </nav>
    );
};

export default Navbar;
