import { motion } from "framer-motion";
import { HiOutlineLightBulb, HiOutlineBookOpen, HiOutlineUserGroup } from "react-icons/hi";
import { FaRegNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
            <header className="bg-gradient-to-r from-gray-700 to-black w-full py-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-4xl sm:text-5xl font-bold text-white"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0 }}
                        >
                            Medium
                        </motion.div>
                    </motion.h1>
                    <p className="text-lg mt-2 text-white">Discover insights, stories, and more.</p>
                </div>
            </header>

            <main className="flex-1 py-12 px-6 sm:px-12 text-center">
                <div className="max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore Our Content</h2>
                    <p className="text-lg mb-8">Find articles on various topics that inspire and inform.</p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                            <HiOutlineLightBulb className="text-4xl mb-2 text-gray-700" />
                            <span className="text-lg font-medium">Technology</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                            <HiOutlineUserGroup className="text-4xl mb-2 text-gray-700" />
                            <span className="text-lg font-medium">Lifestyle</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                            <HiOutlineBookOpen className="text-4xl mb-2 text-gray-700" />
                            <span className="text-lg font-medium">Education</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                            <FaRegNewspaper className="text-4xl mb-2 text-gray-700" />
                            <span className="text-lg font-medium">News</span>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-lg mb-8">Connect with like-minded individuals and share your thoughts.</p>

                    <Link to="/signup" className="bg-gray-700 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-800 transition duration-300">
                        Sign Up Now
                    </Link>
                </motion.div>
            </main>

            <footer className=" py-4 text-gray-900 text-center">
                <p>&copy; {new Date().getFullYear()} Your Blog. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;

