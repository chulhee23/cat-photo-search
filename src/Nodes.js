// component 선언 -> function 타입으로 선언

// Node 컴포넌트 인터랙션에 의해 breadcrumb 에도 영향을 주어야 한다.
// nodes 내에서 breadcrumb 다루면 의존성이 생긴다. -> 반드시 주의
// onclick 함수, 클릭한 node type, id 파라미터로 받음
export default function Nodes({ $app, initialState, onClick }) {
    this.state = initialState
    this.onClick = onClick

    // node 컴포넌트 렌더링할 DOM을 this.$target 으로 생성
    this.$target = document.createElement('ul')
    $app.appendChild(this.$target)

    // state 받아서 현재 컴포넌트 state 변경 후 렌더링
    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }
    
    // parameter 없는 nodes 의 render 함수
    // 현재 상태 this.state 기준으로 렌더링 진행
    this.render = () => {
        if(this.state.nodes){
            const nodesTemplate = this.state.nodes.map(node => {
                const iconPath = node.type === "FILE" ? "./assets/file.png" : "./assets/directory.png"

                return `
                    <div class="Node" data-node-id="${node.id}">
                        <img src="${iconPath}"/>
                        <div>${node.name}</div>
                    </div>
                `
            }).join('')
            
            this.$target.innerHTML = !this.state.isRoot ? `<div class="Node"><img src="./assets/prev.png"/></div>${nodesTemplate}` : nodesTemplate

        }
        
        // rendering 이후 클릭 가능한 모든 요소에 Click event
        this.$target.querySelectorAll('.Node').forEach($node => {
            $node.addEventListener('click', (e) => {
                const {nodeId} = e.target.dataset
                const selectedNode = this.state.nodes.find(node => node.id === nodeId)
                if (selectedNode){
                    this.onClick(selectedNode)
                }
            })

        })
    
    }

    // instance 화 이후 바로 render, new 로 생성하자마자 렌더링
    this.render()
}

