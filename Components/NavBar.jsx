import React, { useState, useContext } from "react";

//Internal Imports
import { CrowdFundingContext } from "../Context/CrowdFunding"; // Adjust import path
import { Logo, Menu } from "../Components/index";

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext); // Destructure connectWallet from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = ["White Paper", "Project", "Donation"];

  return (
    <div className="backgroundMain ">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center mr-8"
            >
              <Logo color="text-white" /> 
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                SathiSahyogi
              </span>
            </a>
            <ul className="flex items-center hidden space-x-8 lg:flex">
              {menuList.map((el, i) => (
                <li key={i + 1}>
                  <a
                    href="/"
                    aria-label="Our product"
                    title="Our Product"
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    {el}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {!currentAccount && (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <button
                  onClick={() => connectWallet()} 
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
                  aria-label="Connect Wallet" // Update aria-label and title
                  title="Connect Wallet"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          )}

          <div className="lg:hidden z-40">
          <button
              aria-label="Close Menu"
              title="Close Menu"
              className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <img
                src="https://clipartcraft.com/images/tree-transparent-animated-7.png"
                alt="Tree Icon"
                className="w-5 text-gray-600"
              />
            </button>
              {isMenuOpen && (
                <div className= "absolute top-0 left-0 w-full">
                  <div className="p-5 bg-white border rounded shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <a
                          href="/"
                          area-label="SathiSahyogi"
                          title = "SathiSahyogi"
                          className="inline-flex items-center"
                        >
                          <Logo color="text-black" />
                          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            SathiSahyogi
                          </span>
                        </a>
                      </div>
                      <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <img
                          src="https://clipartcraft.com/images/tree-transparent-animated-7.png"
                          alt="Tree Icon"
                          className="w-5 text-gray-600" // Adjust the size and styling as needed
                        />
                      </button>
                      </div>
                    </div>
                    <nav>
                      <ul className="space-y-4">
                        {
                          menuList.map((el,i) =>(
                            <li key={i+1}>
                              <a
                                href="/"
                                aria-label="Out Product"
                                title="Out Product"
                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                              >
                                {el}
                              </a>
                            </li>
                        ))}
                        <li>
                          <a
                            href="/"
                            className="inline-flex items-center background justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shawdow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shawdow-outline focus:outline-none"
                            aria-label="Sign up"
                            title="Sign up"
                          >
                            Connect Wallet
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default NavBar;