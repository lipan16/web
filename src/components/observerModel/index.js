/**
 * 观察者模式
 *
 * 观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新
 */

// 被观察者 1
class Subject {
    constructor(){
        this.observerList = []
    }

    addObserver(observer){
        this.observerList.push(observer)
    }

    removeObserver(observer){
        let index = this.observerList.findIndex(f => f.name === observer.name)
        this.observerList.splice(index, 1)
    }

    notifyObservers(message){
        this.observerList.map(m => m.notified(message))
    }
}

// 观察者 多
class Observer {
    constructor(name, subject){
        this.name = name
        subject && subject.addObserver(this)

    }

    notified(message){
        console.log(this.name, ' get message: ', message)
    }
}

const subject = new Subject()
const observerA = new Observer('observerA', subject)
const observerB = new Observer('observerB')

subject.addObserver(observerB)
subject.notifyObservers('Hello from subject')
subject.removeObserver(observerA)
subject.notifyObservers('Hello again')
