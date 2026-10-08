import proyecto1 from "../assets/proyectos/proyecto1.png";
import proyecto2 from "../assets/proyectos/proyecto2.png";
import proyecto3 from "../assets/proyectos/proyecto3.png";
//tecnologias
import javascript from "../assets/icons/javascript.svg";
import typescript from "../assets/icons/typescript.svg";
import react from "../assets/icons/react.svg";
import nextjs from "../assets/icons/nextjs.svg";
import nodejs from "../assets/icons/nodejs.svg";
import tailwind from "../assets/icons/tailwind.svg";
import git from "../assets/icons/git.svg";
import astro from "../assets/icons/astro.svg";
import postman from "../assets/icons/postman.svg";

export const PROJECTS = [
  {
    id: 1,
    titulo: "Instagram Clone",
    descripcion:
      "Este proyecto lo realize para presentar en una entrevista tecnica para una empresa de los estados unidos.",
    imagen: proyecto1,
    ancho: 1600,
    alto: 776,
    tecnologias: [
      "Next JS",
      "Javascript",
      "Tailwind CSS",
      "Zustand",
      "Mockapi",
    ],
    link: "https://next-instagram-buiffhlu1-linearesdiegos-projects.vercel.app/",
  },
  {
    id: 2,
    titulo: "Ayinco",
    descripcion:
      "Este proyecto es un sitio web de una empresa constructura con su responsive y sus formularios de contacto.",
    imagen: proyecto2,
    ancho: 1600,
    alto: 778,
    tecnologias: ["Astro js", "Typescript", "Tailwind CSS"],
    link: "https://www.ayinco.com.ar/",
  },
  {
    id: 3,
    titulo: "Portafolio v2",
    descripcion: "Este proyecto es un portafolio que realize hace dos años.",
    imagen: proyecto3,
    ancho: 1345,
    alto: 593,
    tecnologias: ["Astro js", "Typescript", "Tailwind CSS"],
    link: "https://diego-lineares-dev.vercel.app/",
  },
];

export const TECNOLOGIAS = [
  { nombre: "Javascript", icon: javascript },
  { nombre: "Typescript", icon: typescript },
  { nombre: "React", icon: react },
  { nombre: "Next js", icon: nextjs },
  { nombre: "Node js", icon: nodejs },
  { nombre: "Tailwind css", icon: tailwind },
  { nombre: "Git", icon: git },
  { nombre: "Astro", icon: astro },
  { nombre: "Postman", icon: postman },
];

export const EXPERIENCIA = [
  {
    id: "nodos-hub",
    empresa: "Nodos Hub",
    modalidad: "Jornada completa · Híbrido",
    ubicacion: "San Juan, Argentina",
    puestos: [
      {
        titulo: "Desarrollador Ssr FrontEnd",
        desde: { texto: "ago. 2022", fecha: "2022-08" },
        hasta: { texto: "actualidad" },
        tags: ["JavaScript", "HTTPS", "React JS"],
      },
      {
        titulo: "Desarrollador FrontEnd",
        desde: { texto: "oct. 2022", fecha: "2022-10" },
        hasta: { texto: "dic. 2022", fecha: "2022-12" },
        tags: [],
      },
    ],
  },
  {
    id: "soft-in-health",
    empresa: "Soft In health",
    modalidad: "Jornada parcial · Remoto",
    ubicacion: "Argentina",
    puestos: [
      {
        titulo: "Frontend Developer · HealthTech",
        desde: { texto: "dic. 2025", fecha: "2025-12" },
        hasta: { texto: "feb. 2026", fecha: "2026-02" },
        tags: ["HL7", "DICOM", "NextRis"],
      },
    ],
  },
  {
    id: "suinfi",
    empresa: "SUINFI",
    modalidad: "Jornada parcial · Remoto",
    ubicacion: "San Juan, Argentina",
    puestos: [
      {
        titulo: "Jefe de equipo",
        desde: { texto: "feb. 2024", fecha: "2024-02" },
        hasta: { texto: "abr. 2024", fecha: "2024-04" },
        tags: ["Scrum", "Gestión de liderazgo"],
      },
    ],
  },
];
