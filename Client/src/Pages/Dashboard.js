import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import PPPLOGO from "../Assets/ppp.jpg";

const Dashboard = () => {
    const navigate = useNavigate();
    const [familyId, setFamilyId] = useState("");
    const [isPPPVisible, setIsPPPVisible] = useState(false); 
    const [isPension, setIsPension] = useState(false); 

    const OnLogoutHandler = async () => {
       localStorage.removeItem("isLoggedIn","false")
    }
    const PPPHandler = () => {
        setIsPPPVisible(true);
        setIsPension(false);
    }
    const PensionHandler = () => {
        setIsPension(true);
        setIsPPPVisible(false);
    }
    const handleSubmit = () => {
        if (familyId) {
            const urlPP = `https://ppp-office.haryana.gov.in/Family/PrintFamilyDetails?familyId=${familyId}`;
            window.location.href = urlPP;
        } else {
            toast.error("Please enter a valid Family ID!");
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <aside className="w-full md:w-64 bg-gray-800 text-white p-4 md:fixed h-full">
                <div className="flex items-center justify-center mb-6">
                    <img src="https://flowbite.com/docs/images/logo.svg" alt="Flowbite Logo" className="h-8" />
                    <span className="ml-3 text-2xl font-semibold hidden md:block">BitePrint</span>
                </div>
                <ul className="space-y-4">
                    <li>
                        <a href="/privateRoutes/Dashboard" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            </svg>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li onClick={PPPHandler}>
                        <a className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                            <img className="w-5 h-5" src={PPPLOGO} alt="" />
                            <span>PPP Print</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://fasal.haryana.gov.in/home/login" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
                            <img className="w-5 h-5" src="https://fasal.haryana.gov.in/Assets/files/login/images/logo.png" alt="" />
                            <span>Addhar to PPP</span>
                        </a>
                    </li>
                    <li onClick={PensionHandler}>
                        <a className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                            <img className="w-5 h-5" src={PPPLOGO} alt="" />
                            <span>Search Pension</span>
                        </a>
                    </li>
                    <li onClick={OnLogoutHandler}>
                        <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
                            <svg width="20" height="20" viewBox="0 0 1024 1024" fill="white" xmlns="http://www.w3.org/2000/svg" className="icon">
                                <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z" />
                            </svg>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </aside>

            <main className="flex-1 p-4 md:ml-64 bg-gray-100">
                <nav className="bg-white shadow-lg p-4 mb-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                    </div>
                </nav>

                {isPPPVisible && (
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-gray-600">
                            <span className="text-red-500">Info:</span> Enter the Family ID and submit to redirect to the PPP website. Log in there, return, and enter the Family ID again to get details.
                        </p>
                        <input
                            type="text"
                            value={familyId}
                            onChange={(e) => setFamilyId(e.target.value)}
                            placeholder="Enter the Family ID"
                            className="border p-2 rounded-sm w-full max-w-md"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white p-2 rounded-sm w-full max-w-md"
                        >
                            Submit
                        </button>
                    </div>
                )}

                {isPension && (
                    <form action="https://ppp-office.haryana.gov.in/PensionEnquiry/Search" method="post" className="flex flex-col items-center">
                        <h1 className="text-gray-500 text-xl mb-4">Search For Pensions (Exclusion / ProActive)</h1>
                        <div className="flex flex-col gap-4 w-full max-w-md">
                            <div>
                                <label className="block mb-2" htmlFor="txtSelectedFamilyId">Family Id:</label>
                                <input
                                    className="form-control p-2 border border-gray-500 rounded-sm w-full"
                                    id="txtSelectedFamilyId"
                                    maxLength="8"
                                    name="SelectedFamilyId"
                                    type="text"
                                    placeholder="Enter Your Family Id here"
                                />
                            </div>
                            <div>
                                <label className="block mb-2" htmlFor="ddlSelectedSearchType">Search IN:</label>
                                <select
                                    className="form-control border border-gray-500 rounded-sm p-2 w-full"
                                    id="ddlSelectedSearchType"
                                    name="SelectedSearchType"
                                >
                                    <option value="">Please select</option>
                                    <option value="PROACTIVE">PROACTIVE</option>
                                    <option value="EXCLUSION">EXCLUSION</option>
                                </select>
                            </div>
                            <input type="submit" className="bg-green-400 cursor-pointer p-2 rounded-sm w-full" value="Search" />
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
