const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const architect = $('#app');
const projectItem = $('.project-items');
const staffItem = $('.about-items');

const app = {
    currentIndex: 0, // Lấy ra chỉ mục đầu tiên của mảng
    projects: [
        {
            name: 'Summer House',
            image: './assest/img/house/summerhouse.jpg'
        },
        {
            name: 'Brick House',
            image: './assest/img/house/brickhouse.jpg'
        },
        {
            name: 'Renovated',
            image: './assest/img/house/renovatedhouse.jpg'
        },
        {
            name: 'Barn House',
            image: './assest/img/house/barnhouse.jpg'
        },
        {
            name: 'City House',
            image: './assest/img/house/cityhouse.jpg'
        },
        {
            name: 'Doctor House',
            image: './assest/img/house/doctorhouse.jpg'
        },
        {
            name: 'Farm House',
            image: './assest/img/house/farmhouse.jpg'
        },
        {
            name: 'Teacher House',
            image: './assest/img/house/teacherhouse.jpg'
        },
    ],

    staffs:[
        {
            name: 'John Doe',
            image: './assest/img/staff/johndoe.jpg',
            job: 'CEO & Founder',
            introduce: 'Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.'
        },
        {
            name: 'Jane Doe',
            image: './assest/img/staff/janedoe.jpg',
            job: 'Architect',
            introduce: 'Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.'
        },
        {
            name: 'Dan Start',
            image: './assest/img/staff/danstart.jpg',
            job: 'Architect',
            introduce: 'Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.'
        },
        {
            name: 'Mike Ross',
            image: './assest/img/staff/mikeross.jpg',
            job: 'Architect',
            introduce: 'Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.'
        },
        {
            name: 'khong ten',
            image: './assest/img/staff/mikeross.jpg',
            job: 'Architect',
            introduce: 'Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.'
        },
    ],
    
    render: function(){// render ra view
        //console.log(123);
        const itemProject = document.createElement('div');
        itemProject.classList.add('row', 'sm-gutter');
        const htmls1 = this.projects.map((project) => { // Dùng hàm map() để duyệt qua từng phần tử trong mảng projects
            return `
                    <div class="col l-3 m-6 c-12">
                        <div class="project-picture">
                            <div class="project_img" style="background-image: url('${project.image}');"></div>
                            <h3 class="project_img-title">${project.name}</h3>
                        </div>
                    </div>`
        })
            itemProject.innerHTML = htmls1.join('');
            projectItem.appendChild(itemProject);

        const itemStaff = document.createElement('div');
        itemStaff.classList.add('row', 'sm-gutter');
        const htmls2 = this.staffs.map((staff) => {
            return `
            <div class="col l-3 m-6 c-12">
                <div class="about-picture">
                    <div class="about_img" style="background-image: url('${staff.image}');"></div>
                        <h3 class="about_img-title">${staff.name}</h3>
                        <p class="about_job-location">${staff.job}</p>
                        <p class="about_img_introduce">
                            ${staff.introduce}
                        </p>
                        <button class="btn">Contact</button>
                </div>
            </div>`
        })
            itemStaff.innerHTML = htmls2.join('');
            staffItem.appendChild(itemStaff);
    },

    start: function(){
        // Render project
        this.render()  
    }
}

app.start()