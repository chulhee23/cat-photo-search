import Breadcrumb from "./Breadcrumb.js"
import Nodes from "./Nodes.js"

import {request } from "./api.js"

//nodes 조율 위한 App 컴포넌트
export default function App($app) {
    this.state = {
        isRoot: false,
        nodes: [],
        depth: []
    }

    const breadCrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth
    })

    const nodes = new Nodes({
        $app,
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        onClick: (node) => {
            if (node.type === "DIRECTORY") {
                // 
            } else if (node.type === "FILE") {
                // 
            }
        }
    })

    // app component 의 setState 함수 정의
    this.setState = (nextState) => {
        this.state = nextState
        breadCrumb.setState(this.state.depth)
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
    }

    const init = async () => {
        try {
            const rootNodes = await request()
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })
        } catch (e) {

        }
    }
    init()
}
