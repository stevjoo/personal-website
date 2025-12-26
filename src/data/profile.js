export const profile = {
  name: "Steven Jonathan",
  headline: "Networking Engineer | Cybersecurity Analyst | Software Developer",
  location: "Jakarta Metropolitan Area",
  email: "steven.jonathan2005@gmail.com",
  links: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/steven-jonathan-33a9b8315",
    },
    { label: "GitHub", href: "https://github.com/stevjoo" },
  ],
  summary:
    "Third-year Informatics student at Universitas Multimedia Nusantara with a strong focus on system engineering, networking, and cybersecurity. Actively involved in building simulated infrastructures, managing Linux based systems and configuring networks. In parallel, I also contribute to fullstack web development and software development projects. Passionate about designing secure and scalable systems, and always eager to learn and grow through real-world problem solving and collaboration.",

  education: [
    {
      school: "Universitas Multimedia Nusantara",
      period: "Aug 2023 - Jun 2027",
      degree: "Bachelor of Informatics Engineering",
      gpa: "3.76/4.00",
    },
  ],

  skills: [
    {
      title: "Languages & Framework",
      items: [
        "JavaScript (React, Vue, Inertia)",
        "PHP (Laravel)",
        "MySQL",
        "Python",
      ],
    },
    {
      title: "Tools & Platform",
      items: ["Linux (Fedora, Ubuntu, RHEL)", "Git", "TailwindCSS", "GSAP"],
    },
    {
      title: "Networking",
      items: [
        "VLAN",
        "Cisco ASA",
        "FortiGate",
        "Network Topology",
        "Firewall Config",
      ],
    },
    {
      title: "Languages",
      items: [
        "Bahasa Indonesia (Native)",
        "English (Professional)",
        "Mandarin (Elementary)",
      ],
    },
  ],

  experience: [
    {
      role: "Head of Technical / Blue Team",
      org: "UMN Cybersecurity Communities",
      period: "Mar 2025 - Present",
      bullets: [
        "Designed and implemented the network topology for the community’s cybersecurity lab, simulating real-world attack and defense environments.",
        "Configured secure wireless connections and ensured stable network segmentation for attacker and defender nodes.",
        "Installed and maintained various operating systems (Fedora, Kali Linux, Ubuntu, RHEL, Windows) to support lab operations.",
        "Participated in Capture the Flag (CTF) competitions, focusing on defensive tactics and system hardening.",
        "Provided technical guidance and training for new members in system setup, blue team methodologies, and operational security.",
      ],
    },
    {
      role: "Research and Development Member",
      org: "HMIF UMN XV",
      period: "Dec 2024 - Dec 2025",
      bullets: [
        "Conducted research to support the planning and execution of key work programs.",
        "Served as Person in Charge (PIC) for company visits, managing outreach and communication with partner companies.",
        "Assisted in preparing technical equipment (mixers, projectors, audio systems) prior to internal meetings and events.",
        "Collaborated with fellow R&D members to evaluate and improve organizational initiatives through data-driven insights.",
      ],
    },
    {
      role: "Web Coordinator",
      org: "BYTE 2025",
      period: "Apr 2025 - Nov 2025",
      bullets: [
        "Coordinated and led the web development team for BYTE 2025, working closely with visual design and publication divisions.",
        "Developed a comprehensive event management system using Laravel and Vue.js, including secure authentication for users and committee members.",
        "Led and shaped UI/UX direction to ensure a user-friendly and visually consistent interface.",
      ],
    },
    {
      role: "Frontend Developer",
      org: "UMN Festival 2025",
      period: "Mar 2025 - Nov 2025",
      bullets: [
        "Contributed to frontend and backend development of the UMN Festival 2025 web platform.",
        "Developed dynamic user interfaces using React and Inertia.js for responsive UX.",
        "Collaborated on backend development using Laravel (routing, controller logic, database integration).",
        "Worked with design and content teams to integrate visuals and data workflows.",
      ],
    },
    {
      role: "Head of Logistics",
      org: "Perkenalan Prodi Informatika 2025",
      period: "Jan 2025 - Aug 2025",
      bullets: [
        "Led the logistics division for the Informatics Program Introduction event.",
        "Managed procurement and distribution of logistics (consumption, merchandise, sound systems).",
        "Coordinated setup, equipment readiness, and execution with multiple departments.",
        "Delegated tasks, monitored progress, and ensured alignment with event timeline and goals.",
      ],
    },
    {
      role: "Head of Logistics",
      org: "Garuda Hacks 6.0",
      period: "May 2025 - July 2025",
      bullets: [
        "Oversaw end-to-end logistics planning for a national-level hackathon event.",
        "Coordinated event area setup (judge tables, demo zones, rest areas).",
        "Ensured availability of technical equipment (routers, projectors, backup power supplies).",
      ],
    },
    {
      role: "Frontend Developer",
      org: "Infinite 2024",
      period: "Aug 2024 - Nov 2024",
      bullets: [
        "Developed a responsive page website using React for Infinite 2024.",
        "Ensured clean code structure and component reusability.",
        "Collaborated with design team to implement UI according to branding guidelines.",
      ],
    },
  ],

  projects: [
    {
      name: "BYTE 2025 Website",
      stack: "Laravel, Inertia, Vue",
      linkLabel: "byteumn.com",
      link: "https://byteumn.com",
      bullets: [
        "Developed and maintained the official website using Laravel with Inertia.js and Vue.",
        "Implemented role-based authentication and secure access for committee and administrative users.",
        "Coordinated with design/publication teams for visual consistency and usability.",
        "Optimized UI components for performance and responsiveness.",
      ],
    },
    {
      name: "UMN Festival 2025 Website",
      stack: "Laravel, Inertia, React",
      linkLabel: "umnfestival.com",
      link: "https://umnfestival.com",
      bullets: [
        "Contributed to the development of the official website as part of the web team.",
        "Built interactive UIs using React and Inertia.js for seamless navigation.",
        "Ensured responsive design and smooth UX across devices.",
      ],
    },
    {
      name: "GluCare Mobile Application",
      stack: "Kotlin, Firebase, TensorFlow Lite",
      linkLabel: "github.com/stevjoo/glucare",
      link: "https://github.com/stevjoo/glucare",
      bullets: [
        "Developed an Android healthcare assistance app using Kotlin.",
        "Implemented Google Login and Firebase services for user management and storage.",
        "Integrated TFLite model to detect and classify wounds.",
        "Designed end-to-end data flow between app, ML inference, and backend services.",
      ],
    },
    {
      name: "Arusta Website",
      stack: "Laravel, TailwindCSS",
      linkLabel: "github.com/stevjoo/arusta-web",
      link: "https://github.com/stevjoo/arusta-web",
      bullets: [
        "Developed a web platform for a UMKM photography business.",
        "Implemented clean responsive UI for browsing/ordering services.",
        "Built backend handling for service listings and order submissions.",
      ],
    },
    {
      name: "Infinite 2024 Website",
      stack: "Laravel, Inertia, React, Bun",
      linkLabel: "github.com/stevjoo/infinite24-web",
      link: "https://github.com/stevjoo/infinite24-web",
      bullets: [
        "Developed a modern responsive event website using Laravel + Inertia + React.",
        "Applied component-based architecture for maintainability and scalability.",
        "Utilized Bun to optimize development speed and dependency management.",
      ],
    },
  ],

  competitions: [
    {
      name: "Arkavidia 9.0 - Capture The Flag (CTF)",
      role: "Participant",
    },
    {
      name: "Google Capture The Flag (CTF) 2024",
      role: "Participant",
    },
    {
      name: "Gemastik 15 - Capture The Flag (CTF)",
      role: "Participant",
    },
  ],

  technicalSkills: [
    {
      title: "Systems & Infrastructure",
      groups: [
        { label: "Linux", items: ["Fedora", "Ubuntu", "RHEL", "Bash"] },
        { label: "Virtualization", items: ["VMWare", "VirtualBox", "QEMU"] },
        { label: "Services", items: ["Nginx", "Apache", "SSH"] },
      ],
    },
    {
      title: "Networking & Security",
      groups: [
        {
          label: "Networking",
          items: ["TCP/IP", "VLAN", "Subnetting", "Routing"],
        },
        { label: "Security", items: ["Firewall", "IDS/IPS"] },
        { label: "Tools", items: ["Wireshark", "Nmap", "Burp Suite"] },
      ],
    },
    {
      title: "Software Engineering",
      groups: [
        { label: "Frontend", items: ["Vue", "React", "TailwindCSS"] },
        { label: "Backend", items: ["Node.js", "Express", "Laravel"] },
        { label: "Database", items: ["MySQL"] },
      ],
    },
  ],
};
