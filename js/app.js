document.addEventListener("DOMContentLoaded", () => {
   
    const sections = document.getElementsByClassName("main-section");
    const nav = document.getElementsByTagName("nav")[0];

    //generate nav items according to sections
    const navList = document.createElement("ul");;
    navList.id = "nav-list";
    for(section of sections){
        navList.innerHTML += `
        <li class="nav-item"><a href="#${section.id}">${section.dataset.sectionName}</a></li>`
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
    const navItems = document.getElementsByClassName("nav-item");
    let observerThreshold, observerMargin;
    if (viewportWidth < 700){
        observerThreshold = 0.3;
        observerMargin = "-20% 0% -30%";
        }
    else {
        observerThreshold = 0.75;
        observerMargin = "-5% 0% -25%";
    }

    const sectionObserver = new IntersectionObserver(function(entries,sectionObserver) {
        for (entry of entries){
            let tempSection = entry.target;
            let tempItem;
            // find nav item corresponding to section 
            for (item of navItems){
                if (item.innerText == tempSection.dataset.sectionName){
                    tempItem = item;
                }
            }
            if(entry.isIntersecting){
                tempSection.classList.add("active");
                tempItem.classList.add("active");
             }
            else{
                tempSection.classList.remove("active");
                tempItem.classList.remove("active");
            }
        }
    },{
        rootMargin: observerMargin,
        threshold: observerThreshold,
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
