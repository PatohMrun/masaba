import Image from "next/image";
import { FaFaceSmileWink } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="px-4 py-2">
      {/* An intro paragraph about Michael Masaba who is a software engineer. */}
      <h1 className="font-berkshire font-bold"> Hi, I’m Michael Wanje<FaFaceSmileWink className="inline-block ml-1 text-yellow-900"/>,</h1>

      <div className="font-barlow">
        <Image 
          src={"/images/Mrun.jpg"}
          alt="Michael Masaba"
          width={200}
          height={200}
          className="rounded float-end mx-4 my-2"
          priority
        />
        <p>
        A passionate full stack web developer and aspiring data scientist. I hold a Bachelor of Science degree in Software Engineering from the University of Eastern Africa, Baraton, and I'm also a Microsoft Certified Educator. My core skills include developing web applications using modern technologies such as Python, Flask, Vue.js, and JavaScript. Additionally, I have experience with databases such as MySQL and PostgreSQL. I am constantly exploring new technologies and expanding my knowledge in data science to tackle complex data-driven challenges.
        </p>

      </div>
      
    </div>
  );
}
