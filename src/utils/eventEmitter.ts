/**
 * 发布订阅模式的事件管理器
 */

const EventNames= ['API_UN_AUTH', 'API_VALIDATION_ERROR'] as const
type EventName = (typeof EventNames)[number]

class EventEmitter {
    private listeners: Record<EventName, Set<Function>> = {
        'API_UN_AUTH': new Set(),
        'API_VALIDATION_ERROR': new Set()
    }

    on(eventName: string, listener: Function) {
        this.listeners[eventName].add(listener)
    }

    emit(eventName: string, ...data: any) {
        this.listeners[eventName].forEach(listener => listener(...data))
    }
}

export default new EventEmitter()
