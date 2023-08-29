document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const classifyButton = document.getElementById('classifyButton');
  const resultContainer = document.getElementById('resultContainer');

  classifyButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(
        'http://localhost:4000/classifyuploadimage',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Classification request failed');
      }

      const result = await response.json();

      resultContainer.innerHTML = '';
      resultContainer.innerHTML += `<img src="${URL.createObjectURL(
        file
      )}" alt="Uploaded" width="300"><br>`;

      result.predictions.forEach((item, index) => {
        const p = document.createElement('p');
        p.textContent = `${item.tagName}: ${Math.round(
          item.probability * 100
        )}%`;
        resultContainer.appendChild(p);
      });
    } catch (error) {
      console.error(error);
      resultContainer.innerHTML =
        'An error occurred while classifying the image.';
    }
  });
});
