document.addEventListener('DOMContentLoaded', function() {
   // Theme toggle functionality
   const themeToggle = document.getElementById('theme-toggle');
   const body = document.body;
   
   // Check for saved theme preference or use preferred color scheme
   const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
   
   // Apply the saved theme
   if (savedTheme === 'dark') {
       body.setAttribute('data-theme', 'dark');
       themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
   }
   
   // Theme toggle click event
   themeToggle.addEventListener('click', function() {
       if (body.getAttribute('data-theme') === 'dark') {
           body.removeAttribute('data-theme');
           localStorage.setItem('theme', 'light');
           themeToggle.innerHTML = '<i class="ri-moon-line"></i>';
       } else {
           body.setAttribute('data-theme', 'dark');
           localStorage.setItem('theme', 'dark');
           themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
       }
       
       // Add active class for animation
       this.classList.add('active');
       setTimeout(() => {
           this.classList.remove('active');
       }, 500);
   });
   
   // Smooth scrolling for navigation links
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
       anchor.addEventListener('click', function(e) {
           e.preventDefault();
           
           const targetId = this.getAttribute('href');
           if (targetId === '#') return;
           
           const targetElement = document.querySelector(targetId);
           if (targetElement) {
               const headerHeight = document.querySelector('nav').offsetHeight;
               const targetPosition = targetElement.offsetTop - headerHeight;
               
               window.scrollTo({
                   top: targetPosition,
                   behavior: 'smooth'
               });
               
               // Update active nav link
               document.querySelectorAll('.nav-links a').forEach(link => {
                   link.classList.remove('active');
               });
               this.classList.add('active');
           }
       });
   });
   
   // Highlight active section in navigation while scrolling
   window.addEventListener('scroll', function() {
       const sections = document.querySelectorAll('section');
       const scrollPosition = window.scrollY + document.querySelector('nav').offsetHeight;
       
       sections.forEach(section => {
           const sectionTop = section.offsetTop;
           const sectionHeight = section.offsetHeight;
           const sectionId = section.getAttribute('id');
           
           if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
               document.querySelectorAll('.nav-links a').forEach(link => {
                   link.classList.remove('active');
                   if (link.getAttribute('href') === `#${sectionId}`) {
                       link.classList.add('active');
                   }
               });
           }
       });
   });
   
   // Mobile menu toggle
   const mobileMenu = document.querySelector('.mobile-menu');
   const navLinks = document.querySelector('.nav-links');
   
   mobileMenu.addEventListener('click', function() {
       navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
   });
   
   // Close mobile menu when clicking on a link
   document.querySelectorAll('.nav-links a').forEach(link => {
       link.addEventListener('click', function() {
           if (window.innerWidth <= 768) {
               navLinks.style.display = 'none';
           }
       });
   });
   
   // Course data
   const courses = [
       {
           title: 'Full Stack Web Development',
           instructor: 'Krushna Raut',
           price: '$99',
           rating: '4.9',
           students: '1200',
           image: 'https://images.prismic.io/loco-blogs/79328284-f97b-489f-924c-eb3b17e34b56_image2.png?auto=compress%2Cformat&rect=0%2C0%2C1999%2C1124&w=3840&fit=max',
           description: 'Master MERN stack development with hands-on projects'
       },
       {
           title: 'Advanced JavaScript',
           instructor: 'Krushna Raut',
           price: '$79',
           rating: '4.8',
           students: '850',
           image: 'https://i.ytimg.com/vi/-eelKQvMfyE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDS3dgjCvB2hskTOXqfB5wsAsHiIg',
           description: 'Deep dive into modern JavaScript concepts'
       },
       {
           title: 'React Masterclass',
           instructor: 'Krushna Raut',
           price: '$89',
           rating: '4.7',
           students: '950',
           image: 'https://ik.imagekit.io/ably/ghost/prod/2023/11/best-react-component-libraries.png?tr=w-1728,q-50',
           description: 'Build professional React applications with best practices'
       },
       {
           title: 'Node.js & Express',
           instructor: 'Krushna Raut',
           price: '$69',
           rating: '4.6',
           students: '700',
           image: 'https://codeit.com.np/storage/01J5CG8QJYWM82K1JE6SESQAEB.png',
           description: 'Create scalable backend services with Node.js'
       },
       {
           title: 'Database Design',
           instructor: 'HKrushna Raut',
           price: '$59',
           rating: '4.5',
           students: '500',
           image: 'https://images.ctfassets.net/23aumh6u8s0i/6wTbGkTM3EBoO6hytvOcXj/d0144f86227382219fd2c8f4f53499c6/illustration',
           description: 'Learn relational and NoSQL database concepts'
       },
       {
           title: 'Next js',
           instructor: 'Krushna Raut',
           price: '$89',
           rating: '4.7',
           students: '600',
           image: 'https://codewithmosh.com/_next/image?url=https%3A%2F%2Fcdn.filestackcontent.com%2F8MbtJ4hTAaOk3KPcptqZ&w=3840&q=75',
           description: 'Introduction to Next js, a Js framework'
       }
   ];
   
   // Populate course grid
   const courseGrid = document.querySelector('.course-grid');
   
   courses.forEach(course => {
       const courseCard = document.createElement('div');
       courseCard.className = 'course-card';
       
       courseCard.innerHTML = `
           <div class="course-image">
               <img src="${course.image}" alt="${course.title}">
           </div>
           <div class="course-content">
               <h3 class="course-title">${course.title}</h3>
               <p class="course-instructor">By ${course.instructor}</p>
               <p class="course-description">${course.description}</p>
               <p class="course-price">${course.price}</p>
               <div class="course-meta">
                   <span class="course-rating">⭐ ${course.rating}</span>
                   <span>${course.students}+ students</span>
               </div>
           </div>
       `;
       
       courseGrid.appendChild(courseCard);
   });
   
   // // Form submission
   // const contactForm = document.getElementById('contact-form');
   
   // contactForm.addEventListener('submit', function(e) {
   //     e.preventDefault();
       
   //     const formData = new FormData(this);
   //     const name = formData.get('name');
   //     const email = formData.get('email');
   //     const message = formData.get('message');
       
   //     // Simple validation
   //     if (!name || !email || !message) {
   //         alert('Please fill in all fields');
   //         return;
   //     }
       
   //     // In a real application, you would send this data to a server
   //     console.log('Form submitted:', { name, email, message });
       
   //     // Show success message
   //     alert('Thank you for your message! We will get back to you soon.');
   //     this.reset();
   // });
   
   // Form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in all fields!',
            confirmButtonColor: '#ff4d4d',
        });
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message with modern popup
    Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: 'We will get back to you soon.',
        confirmButtonColor: '#4CAF50',
    });

    this.reset();
});

   // Responsive adjustments
   function handleResize() {
       if (window.innerWidth > 768) {
           navLinks.style.display = 'flex';
       } else {
           navLinks.style.display = 'none';
       }
   }
   
   window.addEventListener('resize', handleResize);
   handleResize();
});