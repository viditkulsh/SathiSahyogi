import React from "react";

const Footer = () => {
    const productList = [
        "ERC20 Token",
        "Donation",
        "IPFS",
    ];

    const contactList = [
        "viditkul08@gmail.com",
        "certainlysohail@gmail.com  ",
    ];

    const usefullLink = [
        "Home",
        "About Us",
        "https://github.com/viditkulsh/SathiSahyogi",
    ];

    // Create a function to generate mailto links
    function generateMailtoLink(email) {
        if (email.includes("@")) {
            return `mailto:${email}`;
        } else {
            return null; // Return null for non-email entries
        }
    }

    return (
        <footer className="text-center text-white backgroundMain lg:text-left">
            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="">
                        <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                            SathiSahyogi
                        </h6>
                        <p>
                            SathiSahyogi is a decentralized crowdfunding platform which eliminates the need for third parties. It also provides transparency on where your money is going.
                        </p>
                    </div>
                    <div className="">
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Products
                        </h6>
                        {productList.map((el, i) => (
                            <p className="mb-4" key={i + 1}>
                                <a href="#!">{el}</a>
                            </p>
                        ))}
                    </div>
                    <div className="">
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Useful links
                        </h6>
                        {usefullLink.map((el, i) => (
                            <p className="mb-4" key={i + 1}>
                                <a href={el.startsWith("http") ? el : "#!"}>{el}</a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Contact
                        </h6>
                        {contactList.map((el, i) => (
                            <p className="mb-4" key={i + 1}>
                                {generateMailtoLink(el) ? (
                                    <a href={generateMailtoLink(el)}>{el}</a>
                                ) : (
                                    el
                                )}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="backgroundMain p-6 text-center">
                <span>©2024 Copyright: </span>
                <a href="https://docs.google.com/document/d/1ubrUqHefL2Fd9ivFEaevwrchO3LCwwT4HSQSYmIdy5E/edit?usp=sharing" className="font-semibold" target="_blank" rel="noopener noreferrer">
                    SathiSahyogi
                </a>
            </div>
        </footer>
    );
};

export default Footer;
