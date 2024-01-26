import { action } from '@storybook/addon-actions'

import BrCookiebar from './Cookiebar.ce.vue'
import BrCookiebarActionsArea from './CookiebarActionsArea.ce.vue'
import BrCookiebarBroad from './CookiebarBroad.ce.vue'
import BrCookiebarCategory from './CookiebarCategory.ce.vue'
import BrCookiebarComplementaryArea from './CookiebarComplementaryArea.ce.vue'
import BrCookiebarCookie from './CookiebarCookie.ce.vue'
import BrCookiebarForewordArea from './CookiebarForewordArea.ce.vue'
import BrCookiebarGlobalArea from './CookiebarGlobalArea.ce.vue'
import BrCookiebarIntroductionArea from './CookiebarIntroductionArea.ce.vue'
import BrCookiebarMainArea from './CookiebarMainArea.ce.vue'
import BrCookiebarNotes from './CookiebarNotes.ce.vue'

export default {
  title: 'Componentes/Cookiebar',
  component: BrCookiebar,
  subcomponents: {
    'br-cookiebar-actions-area': BrCookiebarActionsArea,
    'br-cookiebar-global-area': BrCookiebarGlobalArea,
    'br-cookiebar-complementary-area': BrCookiebarComplementaryArea,
    'br-cookiebar-foreword-area': BrCookiebarForewordArea,
    'br-cookiebar-introductionArea': BrCookiebarIntroductionArea,
    'br-cookiebar-main-area': BrCookiebarMainArea,
    'br-cookiebar-broad': BrCookiebarBroad,
    'br-cookiebar-category': BrCookiebarCategory,
    'br-cookiebar-notes': BrCookiebarNotes,
    'br-cookiebar-cookie': BrCookiebarCookie,
  },
  argTypes: {
    lang: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
    open: {
      control: 'boolean',
    },
  },
}

const actionsData = {
  onReport: action('report'),
}

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    return { args }
  },
  template: `<br-cookiebar v-bind="args" @report=onReport></br-cookiebar>`,
  methods: actionsData,
})

export const Padrao = Template.bind({})
Padrao.args = {
  lang: 'pt-br',
  content: `{
    "pt-br": {
      "labels": {
        "close": "Fechar o cookiebar",
        "update": "Última atualização",
        "categories": "Classes de cookies",
        "enableAll": "Selecionar tudo",
        "disableAll": "Desselecionar tudo",
        "enableCategory": "Selecionar toda classe",
        "disableCategory": "Desselecionar toda classe",
        "enableCookie": "Selecionar",
        "disableCookie": "Desselecionar",
        "awaysEnabled": "Sempre ativo",
        "cookie": "Cookies",
        "expiry": "Vencimento",
        "domain": "Domínio",
        "company": "Empresa",
        "purpose": "Finalidade",
        "description": "Descrição",
        "acceptButton": "Aceitar",
        "rejectButton": "Rejeitar cookies",
        "optInButton": "Ver Políticas de Cookies",
        "optOutButton": "Definir Cookies",
        "notes": "Aviso sobre cookies"
      },
      "intro": {
        "observation": "Usamos cookies para armazenar informações sobre como você usa o nosso site e as páginas que visita. Tudo para tornar sua experiência a mais agradável possível. Para entender os tipos de cookies que utilizamos e customizá-los, clique em 'Definir Cookies'. Ao clicar em 'Aceitar', você consente com a utilização de cookies.",
        "title": "Respeitamos a sua privacidade",
        "update": "28/12/2021",
        "foreword": "O Serpro preza pela sua privacidade e garante a proteção de seus dados pessoais! Destacamos que utilizamos cookies para melhorar sua experiência no site, conforme a nossa Política de Privacidade. Fique à vontade para customizar os cookies que não são estritamente necessários."
      },
      "all": {
        "optIn": false,
        "enable": false,
        "alert": "Ao desabilitar os cookies, alguns serviços podem não funcionar corretamente."
      },
      "categories": [{
        "id": "c1",
        "name": "Estritamente Necessários",
        "optIn": true,
        "description": "Esses cookies são indispensáveis para o funcionamento do site e não podem ser desligados em nossos sistemas por usarem recursos essenciais. Normalmente, eles são definidos apenas em resposta a ações feitas por você que equivalem a uma solicitação de serviços, como definir suas preferências de privacidade, fazer login ou preencher formulários. Você pode configurar seu navegador para bloquear ou alertá-lo sobre esses cookies, mas algumas partes do site não funcionarão. Esses cookies não armazenam qualquer informação pessoalmente identificável."
      },
      {
        "id": "c2",
        "enable": true,
        "name": "Funcionais",
        "description": "Esses cookies permitem que o site proporcione a você funcionalidades e personalização aprimoradas. Podem ser definidos por nós ou por provedores terceiros cujos serviços adicionamos às nossas páginas. Se você não permitir esses cookies, alguns ou todos esses serviços podem não funcionar corretamente."
      },
      {
        "id": "c3",
        "name": "Desempenho",
        "alert": "Ao desligar, não irá funcionar o Google Analytics, ou seja, as estatísticas de acesso ao portal.",
        "description": "Cookies de desempenho são cookies usados especificamente para coletar dados sobre como os visitantes usam o site, incluindo as páginas visitadas com mais frequência e as mensagens de erro recebidas durante a navegação. Esses cookies monitoram apenas o desempenho do site, à medida que o usuário interage com ele, e não coletam informações identificáveis sobre os visitantes. Isso significa que todos os dados coletados são anônimos e usados apenas para melhorar a funcionalidade do site. Se você não permitir esses cookies, sua navegação não fará parte da medição para melhoria de desempenho."
      }],
      "cookies": [{
        "id": "k1",
        "categoryId": "c1",
        "name": "lgpd-cookie-v2",
        "expiry": "365 dias",
        "domain": "serpro.gov.br",
        "company": "Serpro",
        "purpose": "Funcional / Preferências",
        "description": "Cookie da Barra LGPD v2"
      },
      {
        "id": "k2",
        "categoryId": "c1",
        "name": "__ac",
        "expiry": "Sessão",
        "domain": "serpro.gov.br",
        "company": "Plone",
        "purpose": "Autorização",
        "description": "Cookie de autenticação do Plone."
      },
      {
        "id": "k3",
        "categoryId": "c1",
        "name": "__cp",
        "expiry": "Sessão",
        "domain": "serpro.gov.br",
        "company": "Plone",
        "purpose": "Funcional",
        "description": "Cookie de cópia de conteúdo do Plone."
      },
      {
        "id": "k4",
        "categoryId": "c1",
        "name": "statusmessages",
        "expiry": "Sessão",
        "domain": "serpro.gov.br",
        "company": "Plone",
        "purpose": "Funcional",
        "description": "Cookie de mensagens do Plone durante gestão de conteúdo."
      },
      {
        "id": "k5",
        "optIn": true,
        "categoryId": "c2",
        "name": "I18N_LANGUAGE",
        "expiry": "Sessão",
        "domain": "serpro.gov.br",
        "company": "Plone",
        "purpose": "Funcional",
        "description": "O cookie é utilizado no portal do Serpro para redirecionar o usuário para a pasta de idioma correto.",
        "alert": "Se você não permitir esses cookies, esses serviços podem não funcionar corretamente."
      },
      {
        "id": "k6",
        "categoryId": "c2",
        "name": "_GRECAPTCHA",
        "expiry": "180 dias",
        "domain": "google.com",
        "company": "Google",
        "purpose": "Funcional",
        "description": "O reCAPTCHA Enterprise define um cookie necessário (_GRECAPTCHA) quando executado para a finalidade de fornecer sua análise de risco.",
        "alert": "Se você não permitir esses cookies, esses serviços podem não funcionar corretamente."
      },
      {
        "id": "k7",
        "categoryId": "c3",
        "name": "_ga",
        "expiry": "2 anos",
        "domain": "serpro.gov.br",
        "company": "Google",
        "purpose": "Estatística",
        "description": "Usado para distinguir usuários por Google Analytics (cookies analíticos de terceiros: google analytics para fins estatísticos). Tipo de dados processados: endereços IP. Para maximizar a privacidade dos visitantes, utilizamos o recurso 'mascaramento de IP', que impõe ao sistema o escurecimento dos últimos 8 dígitos do endereço IP do visitante antes que qualquer tipo de processamento seja realizado. Objetivo analisado: recolher informação, de forma agregada, sobre o número de utilizadores e a forma como visitam o nosso site, para tratamento de estatísticas.",
        "alert": "Se você não permitir esses cookies, esses serviços podem não funcionar corretamente."
      },
      {
        "id": "k8",
        "categoryId": "c3",
        "name": "_gid",
        "expiry": "1 dia",
        "domain": "serpro.gov.br",
        "company": "Google",
        "purpose": "Estatística",
        "description": "Usado para distinguir usuários por Google Analytics",
        "alert": "Se você não permitir esses cookies, esses serviços podem não funcionar corretamente."
      },
      {
        "id": "k9",
        "categoryId": "c3",
        "name": "_gat",
        "expiry": "1 minuto",
        "domain": "serpro.gov.br",
        "company": "Google",
        "purpose": "Estatística",
        "description": "Usado para limitar solicitações ao Google Analytics"
      }],
      "notes": [{
        "question": "O que são cookies?",
        "answer": "Os cookies são pequenos arquivos criados por sites visitados e que são salvos no computador do usuário, por meio do navegador (browser)."
      },
      {
        "question": "Qual a durabilidade?",
        "answer": "Todos os cookies armazenados têm uma data de vencimento e são eliminados depois dela. Geralmente, esta data é bem extensa e não possui um prazo padrão. A eliminação antes do vencimento pode ser feita manualmente pelo usuário. O armazenamento e a remoção, no entanto, são diferentes para cada navegador. Neste site, os cookies ficam registrados após a ação de clicar no botão 'Aceitar'. Você pode escolher customizá-los a qualquer momento no botão 'Redefinir Cookies'."
      },
      {
        "question": "Qual a proveniência?",
        "answer": "Os cookies foram lançados na internet, em 1994, no navegador Netscape. Embora não armazenem dados de contas bancárias, por exemplo, eles podem guardar informações particulares como endereço pessoal, login e senhas de e-mail. Os cookies não estão apenas nos computadores, já que são armazenados em todos os dispositivos com um navegador, como smartphones, tablets etc."
      },
      {
        "question": "Qual a finalidade?",
        "answer": "Os cookies são utilizados pelos sites principalmente para identificar e armazenar informações no navegador (browser) sobre os visitantes. Servem também para personalizar a página de acordo com o perfil, registrar dados estatísticos e de acompanhamento ou melhorar a performance da aplicação, facilitando o transporte de dados entre as páginas de um mesmo site."
      }],
      "links": [{
        "name": "Declaração de Conformidade com os Princípios de Proteção de Dados",
        "url": "https://www.serpro.gov.br/privacidade-protecao-dados"
      }]
    },
    "en": {
      "labels": {
        "close": "Close Cookiebar",
        "update": "Last update",
        "categories": "Classes of cookies",
        "enableAll": "Select all",
        "disableAll": "Unselect all",
        "enableCategory": "Select all",
        "disableCategory": "Unselect all",
        "enableCookie": "Select",
        "disableCookie": "Unselect",
        "awaysEnabled": "Always active",
        "cookie": "Cookies",
        "expiry": "Expiry",
        "domain": "Domain",
        "company": "Company",
        "purpose": "Purpose",
        "description": "Description",
        "acceptButton": "Accept",
        "rejectButton": "Reject cookies",
        "optInButton": "See Cookie's Policy",
        "optOutButton": "Define Cookies",
        "notes": "Notice about cookies"
      },
      "intro": {
        "observation": "We use cookies to store information about how you use our site and the pages you visit. All to make your experience as pleasant as possible. To understand the types of cookies we use and customize them, click on 'Set Cookies'. By clicking 'Accept', you consent to the use of cookies.",
        "title": "We respect your privacy",
        "update": "12/28/2021",
        "foreword": "Serpro values your privacy and guarantees the protection of your personal data! Please note that we use cookies to enhance your site experience, according to our Privacy Policy. Feel free to customize the cookies that are not strictly necessary."
      },
      "all": {
        "alert": "If you not enable some cookies, some services may not function properly."
      },
      "categories": [{
        "id": "1",
        "name": "Strictly Necessary",
        "optIn": true,
        "description": "These cookies are indispensable for the functioning of the site and cannot be turned off on our systems because they use essential features. They are usually only set in response to actions you take that are equivalent to a service request, such as setting your privacy preferences, logging in, or filling out forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not work. These cookies do not store any personally identifiable information."
      },
      {
        "id": "2",
        "name": "Functional",
        "alert": "If you do not enable these cookies, these services may not function properly.",
        "description": "These cookies enable the site to provide you with enhanced functionality and customization. They can be defined by us or by third-party providers of services that we add to our pages. If you do not enable these cookies, some or all of these services may not function properly."
      },
      {
        "id": "3",
        "name": "Performance",
        "alert": "When you turn it off, Google Analytics will not work, i.e. the statistics of access to the portal.",
        "description": "Performance cookies are cookies used specifically to collect data about how visitors use the site, including the most frequently visited pages and error messages received during browsing. These cookies only monitor the performance of the site as the user interacts with it, and do not collect identifiable information about visitors. This means that all data collected is anonymous and used only to improve the functionality of the site. If you do not enable these cookies, your browsing will not be part of the measurement for performance improvement."
      }],
      "cookies": [{
        "id": "1",
        "categoryId": "1",
        "name": "lgpd-cookie-v2",
        "expiry": "365 days",
        "domain": "serpro.gov.br",
        "company": "Serpro",
        "purpose": "Functional / Preferences",
        "description": "Cookie of the Bar LGPD v2"
      },
      {
        "id": "2",
        "categoryId": "1",
        "name": "__ac",
        "expiry": "Session",
        "domain": "serpro.gov.br",
        "company": "Plone",
        "purpose": "Authorization",
        "description": "Plone authentication cookie."
      },
      {
        "id": "3",
        "categoryId": "1",
        "name": "__cp",
        "expiry": "Session",
        "domain": "serpro.gov.br",
        "company": "Plone",
        "purpose": "Functional",
        "description": "Cookie of copy of Plone content."
      },
      {
        "id": "4",
        "categoryId": "1",
        "name": "statusmessages",
        "expiry": "Session",
        "domain": "serpro.gov.br",
        "company": "Plone",
        "purpose": "Functional",
        "description": "Cookie of Plone messages during content management."
      },
      {
        "id": "5",
        "categoryId": "2",
        "name": "I18N_LANGUAGE",
        "expiry": "Session",
        "domain": "serpro.gov.br",
        "company": "Plone",
        "purpose": "Functional",
        "description": "The cookie is used on the Serpro portal to redirect the user to the correct language folder."
      },
      {
        "id": "6",
        "categoryId": "2",
        "name": "_GRECAPTCHA",
        "expiry": "180 days",
        "domain": "google.com",
        "company": "Google",
        "purpose": "Functional",
        "description": "The reCAPTCHA Enterprise sets a required cookie (_GRECAPTCHA) when executed for the purpose of providing your risk analysis."
      },
      {
        "id": "7",
        "categoryId": "3",
        "name": "_ga",
        "expiry": "2 years",
        "domain": "serpro.gov.br",
        "company": "Google",
        "purpose": "Statistics",
        "description": "Used to distinguish users by Google Analytics (third-party analytics cookies: google analytics for analytical purposes). Type of processed data: IP address. To maximize the privacy of our visitors, we use an 'IP masking' feature that forces the system to black out the last 8 digits of the visitor's IP address before any processing is done. Objective analyzed: collect information, in aggregate form, about the number of users and the way they visit our site, for statistical purposes."
      },
      {
        "id": "8",
        "categoryId": "3",
        "name": "_gid",
        "expiry": "1 day",
        "domain": "serpro.gov.br",
        "company": "Google",
        "purpose": "Statistics",
        "description": "Used to distinguish users by Google Analytics"
      },
      {
        "id": "9",
        "categoryId": "3",
        "name": "_gat",
        "expiry": "1 minute",
        "domain": "serpro.gov.br",
        "company": "Google",
        "purpose": "Statistics",
        "description": "Used to limit requests to Google Analytics"
      }],
      "notes": [{
        "question": "What are cookies?",
        "answer": "Cookies are small files created by visited websites and saved on the user's computer by the browser."
      },
      {
        "question": "What is durability?",
        "answer": "All stored cookies have an expiry date and are deleted after that date. Generally, this date is quite long and has no standard deadline. Deletion before expiry can be done manually by the user. However, the storage and removal are different for each browser. At this site, cookies are registered after clicking the 'Accept' button. You can choose to customize them at any time in the 'Redefine Cookies' button."
      },
      {
        "question": "What is origin?",
        "answer": "Os cookies foram lançados na internet, em 1994, no navegador Netscape. Embora não armazenem dados de contas bancárias, por exemplo, eles podem guardar informações particulares como endereço pessoal, login e senhas de e-mail. Os cookies não estão apenas nos computadores, já que são armazenados em todos os dispositivos com um navegador, como smartphones, tablets etc."
      },
      {
        "question": "What is the purpose?",
        "answer": "Cookies are used by websites primarily to identify and store information in the browser about visitors. They also serve to customize the page according to the profile, record statistical and monitoring data, or improve the performance of the application by facilitating the transport of data between pages of the same site."
      }],
      "links": [{
        "name": "Declaration of Compliance with the Data Protection Principles",
        "url": "https://www.serpro.gov.br/en/privacy-data-protection"
      }]
    }
  }`,
}
