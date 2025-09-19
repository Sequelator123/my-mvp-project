export interface LunchOrder {
  employee_name: string
  order_item: string
  dietary_notes: string
  order_date: string
  status: string
}

export interface LunchOrderRecord extends LunchOrder {
  id: string
  created: string
  updated: string
}

export type ViewMode = 'form' | 'dashboard'

export interface Message {
  type: 'success' | 'error'
  text: string
}