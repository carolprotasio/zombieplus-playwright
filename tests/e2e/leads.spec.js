
const { test, expect } = require("../support/index");
const { faker } = require('@faker-js/faker');

test('CT-001 Deve cadastrar com sucesso um lead na fila de espera', async ({ page }) => {
   
  const msg ='Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.';

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit();
  await page.leads.openModal(); 
  await page.leads.submitLeadForm(leadName, leadEmail);
  await page.popup.haveText(msg);  
});
test('CT-002 Não deve cadastrar um lead com email já cadastrado', async ({ page, request }) => {
  
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit();
  await page.leads.openModal(); 
  await page.leads.submitLeadForm(leadName, leadEmail);

  const msg ='Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(msg);   
});

test('CT-003 Não deve cadastrar com email incorreto', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openModal(); 
  await page.leads.submitLeadForm("test", "test.gmail.com");

  await page.leads.alertHaveText('Email incorreto');  
});
test('CT-004 Não deve cadastrar se "nome" não for preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openModal(); 
  await page.leads.submitLeadForm("", "test@gmail.com");

  await page.leads.alertHaveText('Campo obrigatório');  
  
});
test('CT-005 Não deve cadastrar se "email" não for preenchido', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openModal(); 
  await page.leads.submitLeadForm("test", "");

  await page.leads.alertHaveText('Campo obrigatório');  
});
test('CT-006 Não deve cadastrar se os campos" não forem preenchidos', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openModal(); 
  await page.leads.submitLeadForm("", "");

  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]); 
  
});

