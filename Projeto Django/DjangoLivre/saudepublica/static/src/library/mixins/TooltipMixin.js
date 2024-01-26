import '@govbr-ds/core/dist/components/tooltip/tooltip.css'
import TooltipUtil from '@govbr-ds/core/dist/partial/js/behavior/tooltip'

export default {
  directives: {
    tooltip: {
      beforeMount: function (el, binding) {
        const { text, place, type, timer } = binding.value

        const configuration = {
          activator: el,
          place: place ? place : 'top',
          textTooltip: text,
          type: type ? type : 'info',
          timer: timer,
        }
        if (text) return new TooltipUtil(configuration)
      },
    },
  },
  props: {
    /**
     *  Texto do tooltip. Referência: [Utilitários](/?path=/story/utilitários--page)
     */
    tooltipText: {
      type: String,
      default: null,
    },
    /**
     * Local aonde vai ser mostado o tooltip(top, right, left, bottom)
     */
    tooltipPlace: {
      type: String,
      default: 'top',
    },
    /**
     * Tipo de tooltip(info, warning, error, success)
     */
    tooltipType: {
      type: String,
      default: null,
    },
    /**
     * Tempo em que o tooltip fica aberto em milisegundos
     */
    tooltipTimer: {
      type: String,
      default: null,
    },
  },
}
