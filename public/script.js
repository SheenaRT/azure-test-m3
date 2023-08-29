const uploadForm = document.getElementById('uploadForm');
const resultDiv = document.getElementById('result');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(uploadForm);

  try {
    const response = await fetch('/classifyuploadimage', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // Display the classification result
    resultDiv.innerHTML = `Classification Result: ${JSON.stringify(data)}`;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = 'An error occurred while classifying the image.';
  }
});
