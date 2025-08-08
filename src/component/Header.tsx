"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';

const Header = () => {
  return (
    <nav
      style={{
        width: "100vw",
        height: "10vh",
        background: "#ffffff",
        position: "absolute",
        top: "0%",
        left: "0%",
      }}
    >
      <motion.div
        style={{ width: "8vw", height: "13vh" }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
      >
        <Link href="/">
          <Image
            src="/images/logo-page.jpg"
            alt="logo"
            width={100}
            height={100}
            style={{ borderRadius: '50%', cursor: 'pointer' }}
          />
        </Link>
      </motion.div>

      <Link href="/contact">
        <button
          style={{
            cursor: "pointer",
            background: "#171717",
            color: "#ffffff",
            borderRadius: "0.5em",
            position: "absolute",
            top: "1%",
            right: "5%",
            width: "10%",
            height: "30%",
          }}
        >
          Contact
        </button>
      </Link>

      <span
        style={{
          position: "absolute",
          top: "1%",
          left: "25%",
          width: "50%",
        }}
      >
        <Link href="/" style={{ cursor: "pointer", fontSize: "150%" }}>
          Home
        </Link>
        <Link
          href="/about_us"
          style={{ cursor: "pointer", marginLeft: "5%", fontSize: "150%" }}
        >
          About_us
        </Link>
        <Link
          href="/services"
          style={{ cursor: "pointer", marginLeft: "5%", fontSize: "150%" }}
        >
          Services
        </Link>
        <Link
          href="/projects"
          style={{ cursor: "pointer", marginLeft: "5%", fontSize: "150%" }}
        >
          Video
        </Link>
        <Link
          href="/careers"
          style={{ cursor: "pointer", marginLeft: "5%", fontSize: "150%" }}
        >
          Careers
        </Link>
        <Link
          href="/blog"
          style={{ cursor: "pointer", marginLeft: "5%", fontSize: "150%" }}
        >
          Blog
        </Link>
      </span>
    </nav>
  );
};

export default Header;