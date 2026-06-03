// Funcionalidades específicas da seção Contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validação básica
            const nome = contactForm.querySelector('input[type="text"]')?.value;
            const email = contactForm.querySelector('input[type="email"]')?.value;
            const servico = contactForm.querySelector('select')?.value;
            const mensagem = contactForm.querySelector('textarea')?.value;
            
            if (!nome || !email || !servico || !mensagem) {
                showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Mostra loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simula envio (aqui você pode integrar com um backend real)
            setTimeout(() => {
                // Sucesso
                showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                contactForm.reset();
                
                // Restaura botão
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Opcional: enviar para um serviço como Formspree, Netlify Forms, etc.
                // Exemplo com Formspree:
                /*
                fetch('https://formspree.io/f/seu-id-aqui', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                })
                .then(response => {
                    if (response.ok) {
                        showMessage('Mensagem enviada com sucesso!', 'success');
                        contactForm.reset();
                    } else {
                        showMessage('Erro ao enviar. Tente novamente.', 'error');
                    }
                })
                .catch(error => {
                    showMessage('Erro de conexão. Tente novamente.', 'error');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
                */
                
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            
            // Remove a mensagem após 5 segundos
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        } else {
            alert(message);
        }
    }
    
    // Formatação de telefone (opcional)
    const telInput = contactForm?.querySelector('input[type="tel"]');
    if (telInput) {
        telInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 12) value = value.slice(0, 12);
            e.target.value = value;
        });
    }
});