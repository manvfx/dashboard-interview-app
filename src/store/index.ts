import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type WidgetType = 'Chart' | 'Calendar' | 'Table' | 'List'

interface DashboardState {
  widgetsOrder: WidgetType[]
}

const initialState: DashboardState = {
  widgetsOrder: ['Chart', 'Calendar', 'Table', 'List']
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setWidgetsOrder (state, action: PayloadAction<WidgetType[]>) {
      state.widgetsOrder = action.payload
      // ذخیره در localStorage جهت حفظ ترتیب پس از رفرش
      localStorage.setItem('widgetsOrder', JSON.stringify(action.payload))
    },
    loadWidgetsOrder (state) {
      const stored = localStorage.getItem('widgetsOrder')
      if (stored) {
        state.widgetsOrder = JSON.parse(stored)
      }
    }
  }
})

export const { setWidgetsOrder, loadWidgetsOrder } = dashboardSlice.actions

const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
