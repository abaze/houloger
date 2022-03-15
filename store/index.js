let data_state = () => ({})
// list of store variable
export const state = () => ({
  isReady: false,
  showSlideForm: false,
})

// mutations for set variable
export const mutations = {
  SET_PAGE_READY(state, isReady) {
    state.isReady = isReady
  },
  SET_SHOW_SLIDE_FORM(state, show) {
    state.showSlideForm = show
  },
}

// actions to put some logic in ServerSide or ClientSide in all pages
export const actions = {}
