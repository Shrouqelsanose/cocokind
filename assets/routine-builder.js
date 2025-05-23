document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step");
  const progressCircles = document.querySelectorAll(".progress-circle");
  const progressLine = document.querySelector(".progress-line");
  const stepNumber = document.getElementById("step-number");
  const progressContainer = document.querySelector(".progress-container");
  const backButton = document.querySelector(".back-button");
  const nextButton = document.querySelector(".next-button");

  let currentStep = 0;

  function updateUI() {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
    });

    progressCircles.forEach((circle, index) => {
      circle.classList.toggle("active", index <= currentStep);
    });

    stepNumber.textContent = `${currentStep + 1} / 3`;

    const progressWidth = (currentStep / (progressCircles.length - 1)) * 100;
    progressLine.style.width = `${progressWidth}%`;

    backButton.style.display =
      currentStep === 0 || currentStep === steps.length - 1
        ? "none"
        : "inline-block";
    nextButton.style.display =
      currentStep === steps.length - 1 ? "none" : "inline-block";

    progressContainer.style.display =
      currentStep === steps.length - 1 ? "none" : "flex";

    validateStep();
  }

  function nextStep() {
    if (nextButton.classList.contains("disabled")) return;
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateUI();
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      updateUI();
    }
  }

  function restart() {
    currentStep = 0;
    updateUI();
  }

  function selectFinalOption() {
    currentStep = steps.length - 1;
    updateUI();
  }

  function validateStep() {
    const currentOptions = steps[currentStep].querySelectorAll(".option-label");
    if (currentOptions.length > 0) {
      const isSelected = Array.from(currentOptions).some((option) =>
        option.classList.contains("selected")
      );
      nextButton.classList.toggle("disabled", !isSelected);
    } else {
      nextButton.classList.remove("disabled");
    }
  }

  window.nextStep = nextStep;
  window.prevStep = prevStep;
  window.restart = restart;
  window.selectFinalOption = selectFinalOption;

  updateUI();
});
