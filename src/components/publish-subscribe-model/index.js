/**
 * 发布-订阅
 *
 * 消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在
 * 同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者存在
 *
 *
 * 发布者和订阅者需要通过发布订阅中心进行关联，发布者的发布动作和订阅者的订阅动作相互独立，无需关注对方，消息派发由发布订阅中心负责
 */


    // 发布订阅中心
class PubSub {
    constructor(){
        this.messages = {}
        this.listeners = {}
    }

    // 添加发布者 type：消息类型，content：消息
    addPublish(type, content){
        const existContent = this.messages[type]
        if(!existContent){
            this.messages[type] = []
        }
        this.messages[type].push(content)
    }

    // 添加订阅者 type：订阅的消息类型，callback
    addSubscribe(type, callback){
        const existListener = this.listeners[type]
        if(!existListener){
            this.listeners[type] = []
        }
        this.listeners[type].push(callback)
    }

    // 通知
    notify(type){
        const messages = this.messages[type]
        const subscribers = this.listeners[type] || []
        subscribers.map(cb => cb(messages))
    }
}

// 发布者
class Publisher {
    constructor(name, pubsub){
        this.name = name
        this.pubsub = pubsub
    }

    // 发布type类型的消息content
    publish(type, content){
        this.pubsub.addPublish(type, content)
    }
}

// 订阅者
class Subscriber {
    constructor(name, pubsub){
        this.name = name
        this.pubsub = pubsub
    }

    subscribe(type, callback){
        this.pubsub.addSubscribe(type, callback)
    }
}

const TYPE_A = 'TYPE_A'
const TYPE_B = 'TYPE_B'
const TYPE_C = 'TYPE_C'

const pubsub = new PubSub()

const publisherA = new Publisher('publisherA', pubsub)
publisherA.publish(TYPE_A, 'TYPE_A we are young')
publisherA.publish(TYPE_B, 'TYPE_B the silicon valley')

const publisherB = new Publisher('publisherB', pubsub)
publisherB.publish(TYPE_A, 'TYPE_A stronger')

const publisherC = new Publisher('publisherC', pubsub)
publisherC.publish(TYPE_C, 'TYPE_C a brief history of time')


const subscriber1 = new Subscriber('subscriber1', pubsub)
subscriber1.subscribe(TYPE_A, res => {
    console.log('subscriber1 received', res)
})

const subscriber2 = new Subscriber('subscriber2', pubsub)
subscriber2.subscribe(TYPE_C, res => {
    console.log('subscriber2 received', res)
})

const subscriber3 = new Subscriber('subscriber3', pubsub)
subscriber3.subscribe(TYPE_B, res => {
    console.log('subscriber3 received', res)
})

pubsub.notify(TYPE_A)
pubsub.notify(TYPE_B)
pubsub.notify(TYPE_C)

export default {}
