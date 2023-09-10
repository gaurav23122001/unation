import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./WelcomePage.css";

interface WelcomePageProps {
    setShowWelcomePage: React.Dispatch<React.SetStateAction<boolean>>;
}

function WelcomePage({ setShowWelcomePage }: WelcomePageProps): JSX.Element {
    const history = useHistory();
    const handleGoToFacebookClick = async () => {
        setLoading(true);
        axios.post("https://unation-backend.onrender.com/saveDetails", {
            profession: prof,
            reason: reason,
        });
        setLoading(false);
        setShowWelcomePage(false);
        history.push("/facebook");
        localStorage.setItem("hasVisitedWelcomePage", "true");
    };

    const [page, setPage] = useState(0);
    const [prof, setProf] = useState("");
    const [reason, setReason] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [em, setEm] = useState(false);
    if (page == 0) {
        return (
            <div className="welcome1">
                <form
                    className="form1"
                    onSubmit={(e: any) => {
                        e.preventDefault();
                        setProf(e.target.role.value);
                        setPage(1);
                    }}
                >
                    <div className="welcomeHeading">
                        What is your profession
                    </div>
                    <div className="radioContainer">
                        <span className="welcomeRadio radioMragin">
                            <label htmlFor="student" className="radioText">
                                <input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    required
                                />
                                Student
                            </label>
                        </span>
                        <span className="welcomeRadio radioMragin">
                            <label htmlFor="professional" className="radioText">
                                <input
                                    type="radio"
                                    id="professional"
                                    name="role"
                                    value="professional"
                                    required
                                />
                                Professional
                            </label>
                        </span>
                        <span className="welcomeRadio">
                            <label htmlFor="entrepreneur" className="radioText">
                                <input
                                    type="radio"
                                    id="entrepreneur"
                                    name="role"
                                    value="entrepreneur"
                                    required
                                />
                                Entrepreneur
                            </label>
                        </span>
                    </div>
                    <div className="buttonContainer">
                        <button className="welcomeButton" type="submit">
                            1/3 Next
                        </button>
                    </div>
                </form>
            </div>
        );
    }
    if (page == 1) {
        return (
            <div className="welcome2">
                <form
                    className="form2"
                    onSubmit={(e: any) => {
                        e.preventDefault();
                        const formElements = e.target.elements;
                        const selectedReasons = Array.from(
                            formElements.reason
                        ).filter((checkbox: any) => checkbox.checked);
                        const reasons = selectedReasons.map(
                            (checkbox: any) => checkbox.value
                        );
                        if (reasons.length > 0) {
                            setReason(reasons);
                            setPage(2);
                        }
                        // Do something with the 'reasons' array
                    }}
                >
                    <div className="welcomeHeading1">
                        Why have you installed the plugin
                    </div>
                    <div>
                        <div className="checkboxCont">
                            <input
                                type="checkbox"
                                id="checkbox"
                                className="custom-checkbox"
                                name="reason"
                                value="I want to stop wasting time on social media"
                            />
                            <label
                                htmlFor="checkbox"
                                className="checkbox-label"
                            >
                                I want to stop wasting time on social media
                            </label>
                        </div>
                        <div className="checkboxCont">
                            <input
                                type="checkbox"
                                id="checkbox1"
                                className="custom-checkbox"
                                name="reason"
                                value="I want to avoid some bad habits"
                            />
                            <label
                                htmlFor="checkbox1"
                                className="checkbox-label"
                            >
                                I want to avoid some bad habits
                            </label>
                        </div>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="checkbox2"
                                className="custom-checkbox"
                                name="reason"
                                value="I want to avoid explicit content"
                            />
                            <label
                                htmlFor="checkbox2"
                                className="checkbox-label"
                            >
                                I want to avoid explicit content
                            </label>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <button className="welcomeButton" type="submit">
                            2/3 Next
                        </button>
                    </div>
                </form>
            </div>
        );
    }
    if (page == 2) {
        return (
            <div className={em ? "welcome4" : "welcome1"}>
                <form
                    className="form1"
                    onSubmit={async (e: any) => {
                        e.preventDefault();
                        if (e.target.joining.value == "yes") {
                            setLoading(true);
                            await axios.post(
                                "https://unation-backend.onrender.com/saveDetails",
                                {
                                    profession: prof,
                                    reason: reason,
                                    email: e.target.email.value,
                                }
                            );
                            setLoading(false);
                            window.open("https://unplugnation.org/membership");
                            setShowWelcomePage(false);
                            localStorage.setItem(
                                "hasVisitedWelcomePage",
                                "true"
                            );
                        } else {
                            setPage(3);
                        }
                    }}
                >
                    <div className="welcomeHeading">
                        Do you want to join our community?
                    </div>
                    <div className="checkboxCont">
                        <span className="welcomeRadio radioMargin">
                            <label htmlFor="yes" className="radioText">
                                <input
                                    type="radio"
                                    id="yes"
                                    name="joining"
                                    value="yes"
                                    required
                                    onClick={() => {
                                        setEm(true);
                                    }}
                                />
                                Yes
                            </label>
                        </span>
                        <span className="welcomeRadio radioMargin">
                            <label htmlFor="no" className="radioText">
                                <input
                                    type="radio"
                                    id="no"
                                    name="joining"
                                    value="no"
                                    required
                                    onClick={() => {
                                        setEm(false);
                                    }}
                                />
                                No
                            </label>
                        </span>
                    </div>
                    {em ? (
                        <div>
                            <span className="emailTag">Email</span>
                            <span>
                                <input
                                    type="email"
                                    required
                                    className="emailInput"
                                    name="email"
                                />
                            </span>
                        </div>
                    ) : null}
                    <div className="buttonContainer">
                        <Button
                            isLoading={loading}
                            className="welcomeButton"
                            type="submit"
                        >
                            3/3 Next
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
    return (
        <div className="welcome3">
            <div className="welcomeHeading2">
                <div className="heading">You are all set.</div>
                <div>
                    Simply enable all the functions you want and become 10x
                    better today.
                </div>
            </div>
            <div className="buttonContainer1">
                {/* <Link to="/facebook"> */}
                <Button
                    className="welcomeButton"
                    onClick={handleGoToFacebookClick}
                    isLoading={loading}
                >
                    Let's Go!
                </Button>
                {/* </Link> */}
            </div>
        </div>
    );
}

export default WelcomePage;
