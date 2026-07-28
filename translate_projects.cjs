const fs = require('fs');

const projects = [
    {
        id: "p1",
        desc: "Created a machine learning model to classify large datasets, achieving 97% accuracy. Recognized as a Top 50 Capstone Project in Bangkit Academy 2021."
    },
    {
        id: "p2",
        desc: "Orchestrated end-to-end technical delivery for critical enterprise systems. Bridged the gap between product vision and engineering execution, maintaining flawless velocity across complex multi-tenant architectures."
    },
    {
        id: "p3",
        desc: "A comprehensive web platform designed for custom sportswear. Built from the ground up with Laravel, it features a dynamic catalog showcasing jerseys, hoodies, and activewear for athletes and sports teams."
    },
    {
        id: "p4",
        desc: "A robust personal finance management system built with Laravel. It features an intuitive dashboard for tracking income, expenses, and monthly statistics, giving users a clear overview of their financial health."
    },
    {
        id: "p5",
        desc: "An all-in-one PDF toolkit mobile application built natively with Kotlin and modern Jetpack Compose UI. It features robust local data storage and allows users to scan and organize documents seamlessly."
    },
    {
        id: "p6",
        desc: "Nothing fancy - just a minimalist task manager that helps people stay organized. I built this project to explore React Native and component-based UI development."
    },
    {
        id: "p7",
        desc: "An experimental Android mobile application built for reading digital comics. Features a sleek blue-themed authentication system and a home dashboard equipped with intuitive navigation tabs."
    },
    {
        id: "p8",
        desc: "A fresh farm egg delivery web application tailored for customers in Bandung. It features a smart ordering system with a seamless retention flow, allowing returning customers to quickly repeat their previous orders."
    },
    {
        id: "p9",
        desc: "An Artificial Intelligence web application designed to classify exotic Indonesian birds (like Cendrawasih and Jalak Bali). It features a Convolutional Neural Network (CNN) inference engine and a clean Flask web interface."
    },
    {
        id: "p10",
        desc: "A fullstack e-commerce web application designed for an online bookstore. It features a complete shopping cart system, book catalog management, and seamless database interactions powered by Laravel."
    },
    {
        id: "p11",
        desc: "A vibrant and modern web platform designed for video game streaming and discovery. The user interface embodies a sophisticated gamer aesthetic with dark mode themes and vivid gradients."
    },
    {
        id: "p12",
        desc: "A purely algorithmic Machine Learning project focused on training a Neural Network model from scratch to accurately classify music genres based on audio spectrograms using Python and TensorFlow."
    }
];

let html = fs.readFileSync('index.html', 'utf8');

// Replace using split and join to ensure accuracy and limit replacement to single instances
let htmlBlocks = html.split('<h3 class="gradient-text"');
for(let i=1; i<htmlBlocks.length; i++) {
    const p = projects[i-1];
    
    // Check if it already has a data-i18n tag
    if (htmlBlocks[i].includes(`data-i18n="${p.id}_title"`)) {
        continue;
    }
    
    htmlBlocks[i] = ` data-i18n="${p.id}_title"` + htmlBlocks[i];
    
    // Find the description tag inside this block
    let descClass = 'description';
    if(htmlBlocks[i].includes('class="project-desc"')) {
        descClass = 'project-desc';
    }
    
    let parts = htmlBlocks[i].split(`<p class="${descClass}">`);
    if(parts.length > 1) {
        let insideP = parts[1].split('</p>');
        // Set new translated description placeholder
        insideP[0] = `\n                                    ${p.desc}\n                                `;
        parts[1] = insideP.join('</p>');
        htmlBlocks[i] = parts.join(`<p class="${descClass}" data-i18n="${p.id}_desc">`);
    }
}
html = htmlBlocks.join('<h3 class="gradient-text"');

fs.writeFileSync('index.html', html);
console.log("Done");
