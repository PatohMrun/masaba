'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import { FaLaptopCode, FaDatabase, FaBars, FaXmark, FaMobile } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa";
import { SiFramework } from "react-icons/si";
import { AiTwotoneApi } from "react-icons/ai";
import emailjs from "emailjs-com";
import Experience from "@/components/Experience";

export default function Home() {
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    subject: "",
    message: "",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref to the mobile menu
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    // EmailJS service ID, template ID, and user ID from your EmailJS dashboard
    // const serviceId = "service_tfq53ut";
    // const templateId = "template_b7l3xoa";
    // const userId = "gU9smyfJtTdde9Qyk";

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

    const templateParams = {
      from_name: formData.from_name,
      reply_to: formData.reply_to,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(serviceId!, templateId!, templateParams, userId)
      .then(() => {
        setSuccessMessage("Message sent successfully!");
        setFormData({ from_name: "", reply_to: "", subject: "", message: "" }); // Reset form
      })
      .catch(() => {
        setErrorMessage("Failed to send message. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  
  // Toggle Menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  // Close menu on scroll
  const handleScroll = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Add event listeners for clicking outside and scrolling
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    }

    // Cleanup event listeners when menu closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  // Navigation links component
  const NavLinks = ({ mobile = false }) => (
    <ul
      className={`${
        mobile
          ? "flex flex-col space-y-4"
          : "hidden md:flex md:space-x-6"
      }`}
    >
      <li>
        <a
          href="#skills"
          className="block py-2"
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          Skills
        </a>
      </li>
      {/* <li>
        <a
          href="#projects"
          className="block py-2"
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          Projects
        </a>
      </li> */}
      <li>
        <a
          href="#experience"
          className="block py-2"
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          Experience
        </a>
      </li>
      <li>
        <a
          href="#contact"
          className="block py-2"
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          Contact
        </a>
      </li>
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Header */}
      <header className="top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-md md:text-xl font-bold text-gray-900 dark:text-gray-200">
              Hi, I&apos;m Michael Wanje
            </h1>
            <nav className="hidden md:block">
              <NavLinks />
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                {isMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
              </button>
        <div className={`border-l border-l-gray-900 dark:border-l-white pl-4`}><ThemeSwitch /></div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 py-4 px-6 mt-12 md:mt-0 shadow-md z-50"
        >
          <NavLinks mobile={true} />
        </div>
      )}

      {/* Main Section */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="text-gray-800 dark:text-gray-300 mb-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <Image
              src="/images/Wanje.jpg"
              alt="Michael Wanje"
              width={300}
              height={300}
              className="rounded-full mx-4 my-2 lg:mr-8"
              priority
            />
            <div className="mt-4 lg:mt-0">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Full Stack Web Developer & Aspiring Data Scientist</h2>
              <p className="text-lg leading-relaxed max-w-3xl">
                I hold a Bachelor of Science degree in Software Engineering from the University of Eastern Africa, Baraton, and I&apos;m also a Microsoft Certified Educator. I specialize in modern technologies like Python, Java, Vue.js, JavaScript, and databases such as MySQL and PostgreSQL.
              </p>
              <Link href={"Wanje.pdf"} className="inline-block mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" download={true}>Download CV</Link>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16" id="skills">
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6">Core Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Skill 1 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <FaLaptopCode className="text-red-500 dark:text-red-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Programming Languages</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Python, Dart, Java, JavaScript</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
         
            {/* Skill 2 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <SiFramework className="text-green-500 dark:text-green-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Frameworks</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Vue.js, Flutter, Django</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            {/* Skill 3 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <FaDatabase className="text-blue-500 dark:text-blue-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Databases</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">MySQL, PostgreSQL, SQLite</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            {/* Skill 4 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <FaCodeBranch className="text-cyan-500 dark:text-cyan-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Version Control</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Git, GitHub</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            {/* Skill 5 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <FaMobile className="text-pink-500 dark:text-pink-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Mobile Development</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Android Studio</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            
            {/* Skill 6 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <AiTwotoneApi className="text-yellow-500 dark:text-yellow-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">API Development & Integration</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Postman, RESTful APIa, GraphQL</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>



            {/* Add more skills as needed */}
          </div>
        </section>

        {/* Projects Section
        <section className="mb-16" id="projects">
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6">Notable Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            Project 1
            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md group overflow-hidden">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">Project Name</h4>
              <p className="text-gray-700 dark:text-gray-400 mb-4">Brief description of the project.</p>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <a href="#" className="text-white bg-blue-500 px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">View Project</a>
              </div>
            </div>
            Add more projects as needed
          </div>
        </section> */}

        {/* Experience Section */}
        <section id="experience">
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6">Experience</h3>
          <Experience company = "University of Eastern Africa, Baraton (Department of Accounting)" position = "Office Assistant" year = "September 2024 - Present" description = "Supports day-to-day activites in the office." />
          
          <Experience company = "Microsoft Teals Program" position = "Volunteer Trainer" year = "January 2024 - Present" description = "Incharge of teaching high school students at Meteitei School basic concepts in Computer Science" />
        </section>


        {/* Contact Section */}
        <section id="contact">
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6">Get in Touch</h3>
          <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                value={formData.from_name}
                onChange={handleChange}
                className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="reply_to"
                placeholder="Your Email"
                value={formData.reply_to}
                onChange={handleChange}
                className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                required
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors md:col-span-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          </form>
        </section>
      </main>
    </div>
  );
}