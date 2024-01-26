import '@govbr-ds/core/dist/core-base.min.css'

import { defineCustomElement } from 'vue'

import Avatar from './components/Avatar/Avatar.ce.vue'
import Breadcrumb from './components/Breadcrumb/Breadcrumb.ce.vue'
import Button from './components/Button/Button.ce.vue'
import Card from './components/Card/Card.ce.vue'
import CardContent from './components/Card/CardContent.ce.vue'
import CardFooter from './components/Card/CardFooter.ce.vue'
import CardHeader from './components/Card/CardHeader.ce.vue'
import Checkbox from './components/Checkbox/Checkbox.ce.vue'
import Collapse from './components/Collapse/Collapse.ce.vue'
import Cookiebar from './components/Cookiebar/Cookiebar.ce.vue'
import Divider from './components/Divider/Divider.ce.vue'
import Footer from './components/Footer/Footer.ce.vue'
import Header from './components/Header/Header.ce.vue'
import HeaderAction from './components/Header/HeaderAction.ce.vue'
import HeaderSearch from './components/Header/HeaderSearch.ce.vue'
import IconBase from './components/IconBase/IconBase.ce.vue'
import Input from './components/Input/Input.ce.vue'
import Item from './components/Item/Item.ce.vue'
import List from './components/List/List.ce.vue'
import Loading from './components/Loading/Loading.ce.vue'
import MagicButton from './components/MagicButton/MagicButton.ce.vue'
import Menu from './components/Menu/Menu.ce.vue'
import Message from './components/Message/Message.ce.vue'
import Modal from './components/Modal/Modal.ce.vue'
import Notification from './components/Notification/Notification.ce.vue'
import Scrim from './components/Scrim/Scrim.ce.vue'
import Select from './components/Select/Select.ce.vue'
import SelectMultipleList from './components/Select/SelectMultipleList.ce.vue'
import SelectSimpleList from './components/Select/SelectSimpleList.ce.vue'
import SignIn from './components/SignIn/SignIn.ce.vue'
import Switch from './components/Switch/Switch.ce.vue'
import Tab from './components/Tab/Tab.ce.vue'
import TabItem from './components/Tab/TabItem.ce.vue'

import { EventBus } from './util/Utils'
/** FIXME Registrar o event-bus de forma global dentro da arquitetura do Vue */
window.eventBus = new EventBus()

const componentsConfig = [
  { tagName: 'br-avatar', component: Avatar },
  { tagName: 'br-breadcrumb', component: Breadcrumb },
  { tagName: 'br-button', component: Button },
  { tagName: 'br-card-content', component: CardContent },
  { tagName: 'br-card-footer', component: CardFooter },
  { tagName: 'br-card-header', component: CardHeader },
  { tagName: 'br-card', component: Card },
  { tagName: 'br-collapse', component: Collapse },
  { tagName: 'br-checkbox', component: Checkbox },
  { tagName: 'br-cookiebar', component: Cookiebar },
  { tagName: 'br-divider', component: Divider },
  { tagName: 'br-footer', component: Footer },
  { tagName: 'br-header-action', component: HeaderAction },
  { tagName: 'br-header-search', component: HeaderSearch },
  { tagName: 'br-header', component: Header },
  { tagName: 'br-icon-base', component: IconBase },
  { tagName: 'br-input', component: Input },
  { tagName: 'br-item', component: Item },
  { tagName: 'br-list', component: List },
  { tagName: 'br-loading', component: Loading },
  { tagName: 'br-magic-button', component: MagicButton },
  { tagName: 'br-menu', component: Menu },
  { tagName: 'br-message', component: Message },
  { tagName: 'br-modal', component: Modal },
  { tagName: 'br-notification', component: Notification },
  { tagName: 'br-scrim', component: Scrim },
  { tagName: 'br-sign-in', component: SignIn },
  { tagName: 'br-select', component: Select },
  { tagName: 'br-select-multiple-list', component: SelectMultipleList },
  { tagName: 'br-select-simple-list', component: SelectSimpleList },
  { tagName: 'br-switch', component: Switch },
  { tagName: 'br-tab-item', component: TabItem },
  { tagName: 'br-tab', component: Tab },
]

componentsConfig.forEach((config) => {
  customElements.define(config.tagName, defineCustomElement(config.component))
})
