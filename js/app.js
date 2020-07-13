document.addEventListener("DOMContentLoaded", () => {
   
    const sections = document.getElementsByClassName("main-section");
    const nav = document.getElementsByTagName("nav")[0];

    //generate nav items according to sections
    const navList = document.createElement("ul");;
    for(section of sections){
        navList.innerHTML += `
        <li><a href="#${section.id}">${section.dataset.sectionName}</a></li>`
    }
    nav.appendChild(navList);

    let viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    //navigation buttons for mobile
    if(viewportWidth < 700){
        document.getElementById("nav-icon").addEventListener("click", () => {
            nav.style.right = "0";
        });
        document.getElementById("nav-close").addEventListener("click", () =>{
            nav.style.right = "-60vw";
        });
    }   

    if (viewportWidth >= 700){
        //change navbar when entering/leaving header for desktop
        const navbarObserver = new IntersectionObserver(function(entries,navbarObserver){
            let tempHeader = entries[0];
            if(!tempHeader.isIntersecting){
                nav.style.backgroundColor = " rgb(242, 240, 240)";
            }
            else{
                nav.style.backgroundColor = "rgba(0,0,0,0)";
            }
        },{
        root: null,
        threshold: 0.10,
        });
    navbarObserver.observe(document.getElementsByTagName("header")[0]);

    //hide navbar on scroll for desktop
    window.addEventListener("scroll",() =>{
        nav.style.top = "-70px";
        setTimeout(() =>{
            nav.style.top = "0";
        },1200);
    })
    }

    //smooth-scroll
    const scroll = new SmoothScroll('a[href*="#"]',{speed:1000});

    //differrentiate active sections
    const sectionObserver = new IntersectionObserver(function(entries,sectionObserver) {
        for (entry of entries){
            let tempSection = entry.target;
            if(entry.isIntersecting){
            tempSection.classList.add("active");
             }
            else{
            tempSection.classList.remove("active");
            }
        }
    },{
        rootMargin: "-30% 0%",
        threshold: 0.25
    });
    for(section of sections){
     sectionObserver.observe(section);
    }

     //form
    document.getElementById("submit").addEventListener("click", function (event){
        event.preventDefault();
        alert("Thank you !");
    });
})
