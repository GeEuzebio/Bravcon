const express = require("express");
const path = require("path");
const fetch = require("node-fetch")

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-access-token', (req, res) => {
    fetch('https://sandbox.belvo.com/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Host': 'sandbox.belvo.com',
        },
        body: JSON.stringify({
            id: "523aaabe-3dce-49ea-bb14-b735b6ee260a",
            password: "t-hdVW@gcWjDF@b7QuCqBm1FYOCqJbQ2dqGKBYEQblEso2dIWwI_UhKehbs2J@EK",
            scopes: "read_institutions,write_links,read_consents,write_consents,write_consent_callback,delete_consents",
            widget: {
                branding: {
                    company_icon: "img/bravcon_icon.svg",
                    company_logo: "img/bravcon_icon.svg",
                    company_name: "Bravcon",
                    social_proof: true,
                    company_terms_url: "https://belvo.com/terms-service/",
                    company_benefit_header: "Faster approvals",
                    company_benefit_content: "Using Belvo cuts down on your loan approval time by up to 15 days.",
                    opportunity_loss: "It can take up to 20 days to evaluate your request using traditional methods.",
                    overlay_background_color: "#292928"
                },
                openfinance_feature: "consent_link_creation",
                callback_urls: {
                    success: "https://www.belvo.com"
                },
                consent: {
                    terms_and_conditions_url: "https://www.belvo.com",
                    permissions: [
                        "REGISTER",
                        "ACCOUNTS",
                        "CREDIT_CARDS",
                        "CREDIT_OPERATIONS"
                    ],
                    identification_info: [
                        {
                            type: "CPF",
                            number: "03260162364",
                            name: "George Euzébio"
                        }
                    ]
                }
            }
        })
    })
        .then(response => response.json())
        .then(data => {
            const refreshToken = data.refresh;
            const accessToken = data.access;
            res.json({ access: accessToken });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Erro ao obter o token de acesso' });
        });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})