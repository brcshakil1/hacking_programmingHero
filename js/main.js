const milestonesData = JSON.parse(data).data;

function loadMilestones() {
    const milestones = document.querySelector(".milestones");
    milestones.innerHTML = `${milestonesData.map(milestone => {
        return `
        <div class="milestone border-b" id="${milestone._id}">
            <div class="flex">
            <div class="checkbox"><input type="checkbox" onclick="markMileStone(this, ${
              milestone._id
            })" /></div>
              <div onclick= "openMilestone(this, ${milestone._id})">
                <p>
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
              ${milestone.modules
              .map(module => {
                return `
                <div class="module border-b">
                  <p>${module.name}</p>
                </div>
                `;
              })
              .join("")
              }
            </div>
        </div>
        `;
    })
    .join("")}
    `;
}

function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const activePanel = document.querySelector(".active");

  // first remove previous active class if any [other than the clicked one]
  if (activePanel && !milestoneElement.classList.contains("active")) {
    activePanel.classList.remove("active");
  }
  //toggle current panel
  milestoneElement.classList.toggle("active");

  // first hidden the previous panel if open [other than clicked one]
  if(!currentPanel.classList.contains("show") && shownPanel) {
    shownPanel.classList.remove("show");
  }

  //toggle current panel
  currentPanel.classList.toggle("show");

  showMilestone(id)
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  const title = document.querySelector(".title");
  const details = document.querySelector(".details");


  milestoneImage.style.opacity = "0"
  milestoneImage.src = milestonesData[id].image;
  title.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;

}

const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
  this.style.opacity = "1";
};

function markMileStone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const milestonesList = document.querySelector(".milestones");
  const item = document.getElementById(id);

  if(checkbox.checked) {
    // mark as done
    milestonesList.removeChild(item);
    doneList.appendChild(item);
  }

  else {
    // back to main list
    milestonesList.appendChild(item);
    doneList.removeChild(item);

    // task - do the sorting
    // reload list
  }
}


loadMilestones()