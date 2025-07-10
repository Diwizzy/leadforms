document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("leadForm");
    const statusDiv = document.getElementById("statusMessage");

    // Инициализация VK SDK
    VK.init({
        apiId: YOUR_APP_ID // Укажи ID своего приложения
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!name || !phone) {
            showStatus("Заполните обязательные поля", "red");
            return;
        }

        try {
            // Отправляем лид через API ВК
            const response = await VK.Api.call("leads.start", {
                lead_id: 123456, // заменить на твой lead_id из ВК
                secret: "your_secret_key", // секретный ключ из ВК
                data: JSON.stringify({ name, phone, email }),
                test_mode: 1 // убрать для боевого режима
            });

            if (response.error) {
                throw new Error(response.error.error_msg);
            }

            showStatus("Форма успешно отправлена!", "green");
            form.reset();
        } catch (error) {
            console.error("Ошибка отправки лида:", error);
            showStatus("Ошибка: " + error.message, "red");
        }
    });

    function showStatus(message, color) {
        statusDiv.textContent = message;
        statusDiv.style.color = color;
    }
});
