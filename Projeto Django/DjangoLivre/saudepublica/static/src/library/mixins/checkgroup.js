const Checkgroup = {
  emits: [
    'update:indeterminate', // Evento emitido para fazer o two-way data binding com a prop indeterminate.
  ],
  props: {
    /** **[OPCIONAL]** Declara o comportamento checkgroup e coloca o checkbox como sendo filho. O pai possui o mesmo valor para a propriedade 'checkgroup-parent' */
    checkgroupChild: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Declara o comportamento checkgroup e coloca o checkbox como sendo pai. O filho possui o mesmo valor para a propriedade 'checkgroup-child' */
    checkgroupParent: {
      type: String,
      default: null,
    },
    /** **[OPCIONAL]** Estado indeterminate do checkbox. */
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      children: [], // Array que armazena objetos contendo dados do checkbox filho.
      isIndeterminate: this.indeterminate, // Estado indeterminate do checkbox.
      reverseFlag: false, // Flag usada para controlar a mudança de estado do checkbox filho no modo reverso (filho pra pai).
    }
  },
  computed: {
    /**
     * [PROPRIEDADE COMPUTADA] Controla o two-way data binding do estado indeterminate com propriedades get and set.
     * @return {Object} Objeto contendo métodos get e set.
     */
    _indeterminate: {
      /**
       * Pega o estado indeterminate passado ao componente. Só pode ser alterado pelo "lado de fora do checkbox" usando a prop "indeterminate".
       * @return {Boolean} Prop indeterminate.
       */
      get() {
        return this.indeterminate
      },
      /**
       * Guarda o estado do checkbox no data "isIndetermiante".
       * Emite o evento "update:indeterminate" usado para two-way data binding com o estado indeterminate.
       * @param {Boolean} value Estado indeterminate do checkbox.
       */
      set(value) {
        this.isIndeterminate = value
        this.$emit('update:indeterminate', value)
      },
    },
  },
  watch: {
    isIndeterminate() {
      if (this.checkgroupParent && this.checkgroupChild) {
        this.fireChildChangeStateEvent()
      }
    },
  },
  methods: {
    /**
     * Dispara o evento "<nome-do-grupo>-child-change" registrado no event-bus.
     * Esse evento é disparado pelo checkbox filho.
     * É passado como payload um objeto contendo dados sobro o checkbox filho.
     */
    fireChildChangeStateEvent() {
      if (!this.reverseFlag) {
        window.eventBus.fire(`${this.checkgroupChild}-child-change`, {
          id: this._id,
          isChecked: this.isChecked,
          isIndeterminate: this.isIndeterminate,
        })
      }
    },
    /**
     * Dispara o evento click no input.
     * Esse disparo ocorre no sincronismo reverso do checkgroup, ou seja de filho para pai.
     * Para isso é usado a flag reverseFlag
     */
    fireReverseClick() {
      this.reverseFlag = true
      this.$el.querySelector('input').click()
      this.reverseFlag = false
    },
    /**
     * Dispara o evento "<nome-do-grupo>-parent-change" registardo no event-bus.
     * Esse método também registra os estados dos checkboxes filhos na lista de checkboxes filhos do pai.
     * Esse evento é disparado pelo checkbox pai.
     * É passado como payload um objeto contendo o estado do checkbox pai.
     */
    fireParentChangeStateEvent() {
      window.eventBus.fire(`${this.checkgroupParent}-parent-change`, {
        parentState: this.isChecked,
      })
      this.children.forEach((child) => {
        this.trackChildState({
          id: child.id,
          isChecked: this.isChecked,
          isIndeterminate: false,
        })
      })
    },
    /**
     * Dispara o evento "<nome-do-grupo>-store-child" registrado no event-bus.
     * Esse evento é disparado pelo checkbox filho.
     * É passado como payload um objeto contento dados sobre o checkbox filho.
     */
    fireStoreChildEvent() {
      window.eventBus.fire(`${this.checkgroupChild}-store-child`, {
        id: this._id,
        isChecked: this.isChecked,
        isIndeterminate: this.isIndeterminate,
      })
    },
    /**
     * Determina o estado de todos os checkboxes filhos como um todo.
     * @returns {Boolean, String} Estado de todos os checkboxes filhos. Pode ser true, false ou indeterminate
     */
    getAllChildState() {
      if (this.isAnyChildIndeterminate()) {
        return 'indeterminate'
      } else if (this.isAllChildTrue()) {
        return true
      } else if (this.isAllChildFalse()) {
        return false
      } else {
        return 'indeterminate'
      }
    },
    /**
     * Verifica se todos os checkboxes filhos estão no estado false.
     * @returns {Boolean} Estado dos checkboxes filhos.
     */
    isAllChildFalse() {
      return this.children.filter((child) => child.isChecked === false).length === this.children.length
    },
    /**
     * Verifica se todos os checkboxes filhos estão no estado true.
     * @returns {Boolean} Estado dos checkboxes filhos.
     */
    isAllChildTrue() {
      return this.children.filter((child) => child.isChecked === true).length === this.children.length
    },
    /**
     * Verifica se algum checkbox filho está no estado indeterminate.
     * Para o caso de um checkbox filho ser também um checkbox pai de outro grupo.
     * @returns {Boolean} Estado dos checkboxes filhos em relação ao estado indeterminate
     */
    isAnyChildIndeterminate() {
      return this.children.filter((child) => child.isIndeterminate === true).length > 0
    },
    /**
     * Registra o evento "<nome-do-evento>-child-change" no event-bus com o método de callback "updateParentState"
     * Esse evento serve para monitorar a mudança de estado do checkbox filho.
     * Esse evento é registrado pelo checkbox pai.
     */
    registerChildChangeStateEvent() {
      window.eventBus.register(`${this.checkgroupParent}-child-change`, this.updateParentState)
    },
    /**
     * Registra o evento "<nome-do-grupo>-parent-change" no event-bus com o método de callback "updateChildState".
     * Esse evento serve para monitorar a mudança de estado do checkbox pai.
     * Esse evento é registrado pelo checkbox filho.
     */
    registerParentChangeStateEvent() {
      window.eventBus.register(`${this.checkgroupChild}-parent-change`, this.updateChildState)
    },
    /**
     * Registra o evento <nome-do-grupo>-store-child> no event-bus com o método de callback "storeChild".
     * Esse evento serve para armazenar os estados dos checkboxes filho no checkbox pai.
     * Esse evento é registrado pelo checkbox pai.
     */
    registerStoreChildEvent() {
      window.eventBus.register(`${this.checkgroupParent}-store-child`, this.storeChild)
    },
    /**
     * Verifica se o estado do checkbox pai é indeterminado no momento do click.
     * Se for indeterminado, o estado do checkbox passa a ser true para checked e false para indeterminate
     */
    setParentIndeterminateStateOnClick() {
      if (this.isIndeterminate) {
        this.setState({ isChecked: true, isIndeterminate: false })
      }
    },
    /**
     * Configura os estados checked e indeterminate do checkbox.
     * @param {Boolean} isChecked Estado checked do checkbox
     * @param {Boolean} isIndeterminate Estado indeterminate do checkbox
     */
    setState({ isChecked, isIndeterminate }) {
      const input = this.$el.querySelector('input[type="checkbox"]')
      input.indeterminate = isIndeterminate
      input.checked = isChecked
      input.dispatchEvent(new Event('innerChange'))
    },
    /**
     * Registra os handlers disparados na ocorrência do evento "change".
     * Esses handlers são disparados pela acão direta do usuário ao clicar no checkbox.
     * O evento "change" é disparado automaticamente pelo browser após o evento "click".
     */
    setTriggers() {
      if (this.checkgroupParent) {
        this.$el.querySelector('input').addEventListener('change', this.fireParentChangeStateEvent)
        this.$el.querySelector('input').addEventListener('click', this.setParentIndeterminateStateOnClick)
      }
      if (this.checkgroupChild) {
        this.$el.querySelector('input').addEventListener('change', this.fireChildChangeStateEvent)
      }
    },
    /**
     * Armazena os dados do checkbox filho.
     * Handler para o evento "<nome-do-grupo>-store-child".
     * @param {Object} event Objeto Event. Contém os dados enviados na propriedade "detail"
     */
    storeChild(event) {
      if (this.children.filter((child) => child.id === event.detail.id).length === 0) {
        this.children.push(event.detail)
      }
    },
    /**
     * Rastreia alterações no checkbox filho, armazenando os seus dados no checkbox pai.
     * @param {Object} child Objeto contento dados sobre o checkbox filho.
     */
    trackChildState(child) {
      const index = this.children.findIndex((_child) => _child.id === child.id)
      this.children[index].isChecked = child.isChecked
      this.children[index].isIndeterminate = child.isIndeterminate
    },
    /**
     * Atualiza o estado do checkbox filho.
     * Handler para o evento "<nome-do-grupo>-parent-change".
     * @param {Object} event Objeto Event. Contém o dado enviado na propriedade "detail"
     */
    updateChildState(event) {
      if (this.isIndeterminate) {
        this.fireReverseClick()
      } else if (this.isChecked !== event.detail.parentState) {
        this.fireReverseClick()
      }
    },
    /**
     * Atualiza o estado indeterminate do checkbox por meio da propriedade computada _indeterminate.
     * @param {Object} event Objeto Event
     */
    updateIndeterminateState(event) {
      this._indeterminate = event.target.indeterminate
    },
    /**
     * Atualiza o estado do checkbox pai.
     * Handler para o evento "<nome-do-grupo>-child-change".
     * @param {Object} event Objeto Event. Contém os dados enviados na propriedade "detail".
     */
    updateParentState(event) {
      this.trackChildState(event.detail)
      switch (this.getAllChildState()) {
        case true:
          this.setState({ isChecked: true, isIndeterminate: false })
          break
        case false:
          this.setState({ isChecked: false, isIndeterminate: false })
          break
        case 'indeterminate':
          this.setState({ isChecked: true, isIndeterminate: true })
          break
      }
    },
  },
  created() {
    if (this.checkgroupChild) {
      this.registerParentChangeStateEvent()
    }
    if (this.checkgroupParent) {
      this.registerStoreChildEvent()
      this.registerChildChangeStateEvent()
    }
  },
  beforeMount() {
    if (this.checkgroupChild) {
      this.fireStoreChildEvent()
    }
  },
  mounted() {
    this.setTriggers()
  },
}

export default Checkgroup
