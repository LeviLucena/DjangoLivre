import { shallowMount } from '@vue/test-utils'

import Avatar from '../Avatar/Avatar.ce.vue'
import Card from '../Card/Card.ce.vue'
import CardContent from '../Card/CardContent.ce.vue'
import CardFooter from '../Card/CardFooter.ce.vue'
import CardHeader from '../Card/CardHeader.ce.vue'
import BrCollapse from '../Collapse/Collapse.ce.vue'

describe('Card', () => {
  test('Testa se a prop disable está sendo renderizada.', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        disable: true,
      },
    })

    expect(wrapper.find('.br-card').attributes('disable')).toBe('true')
  })

  test('Testa a renderização do card com Collapse.', () => {
    const wrapper = shallowMount(Card, {
      slots: {
        header: `
        <br-card-footer slot="footer">
        <br-collapse show-icon :collapsed="collapse">
          <div class="br-list mt-3">
            <div class="br-item">
              <div class="row">
                <div class="col-auto"><i class="fas fa-heartbeat" aria-hidden="true"></i></div>
                <div class="col">
                  <p class="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>
            <span class="br-divider"></span>
            <div class="br-item">
              <div class="row">
                <div class="col-auto"><i class="fas fa-heartbeat" aria-hidden="true"></i></div>
                <div class="col">
                  <p class="m-0">
                    Nesciunt, laudantium ea officiis hic tempora velit aperiam nemo accusamus nisi, eligendi ducimus!
                    Incidunt ullam minima ratione amet sequi.
                  </p>
                </div>
              </div>
            </div>
            <span class="br-divider"></span>
            <div class="br-item">
              <div class="row">
                <div class="col-auto"><i class="fas fa-heartbeat" aria-hidden="true"></i></div>
                <div class="col">
                  <p class="m-0">Voluptates, iste recusandae.</p>
                </div>
              </div>
            </div>
          </div>
        </br-collapse>
      </br-card-footer>
        `,
      },
      global: {
        stubs: {
          'br-card-footer': CardFooter,
          'br-collapse': BrCollapse,
        },
      },
    })

    expect(wrapper.findComponent(CardFooter))
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Testa a renderização do slot header.', () => {
    const wrapper = shallowMount(Card, {
      slots: {
        header: `
          <div slot="header">
            <br-card-header >
              <div class="d-flex">
                <br-avatar imgSrc="https://picsum.photos/id/823/400" />
                <div class="ml-3">
                  <p class="h5 text-primary-default mb-0">Maria Amorim</p>
                  <span>UX Designer</span>
                </div>
                <div class="ml-auto">
                  <button type="circle">
                    <span slot="button-icon">
                      <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
              </div>
            </br-card-header>
          </div>
        `,
      },
      global: {
        stubs: {
          'br-card-header': CardHeader,
          'br-avatar': Avatar,
        },
      },
    })

    expect(wrapper.findComponent(CardHeader))
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Testa a renderização do slot content.', () => {
    const wrapper = shallowMount(Card, {
      slots: {
        content: `
        <div slot="content">
          <br-card-content>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Tempore perferendis nam porro atque ex at, numquam non
              optio ab eveniet error vel ad exercitationem, earum et
              fugiat recusandae harum? Assumenda.
            </p>
          </br-card-content>
        </div>
        `,
      },
      global: {
        stubs: {
          'br-card-content': CardContent,
        },
      },
    })
    expect(wrapper.findComponent(CardContent))
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Testa a renderização do slot footer.', () => {
    const wrapper = shallowMount(Card, {
      slots: {
        footer: `
          <div slot="footer">
            <br-card-footer>
              <div class="d-flex">
                <div>
                  <button label="Button" />
                </div>
                <div class="ml-auto">
                  <button type="circle">
                    <span slot="button-icon">
                      <i class="fas fa-share-alt" aria-hidden="true"></i>
                    </span>
                  </button>
                  <button type="circle">
                    <span slot="button-icon">
                      <i class="fas fa-heart" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
              </div>
            </br-card-footer>
          </div>
        `,
      },
      global: {
        stubs: {
          'br-card-footer': CardFooter,
        },
      },
    })

    expect(wrapper.findComponent(CardFooter))
    expect(wrapper.element).toMatchSnapshot()
  })
})
