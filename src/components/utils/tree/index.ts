import {Node, NodeState} from '../../shared/RsTreeWithSearch'

const traverseParent = (rootId:string, data:{[id:string]:Node} ,cbk:(node:Node|null) => void) => {
    let root = data[rootId];
    if(root.pid !== '-1') {
        let parent = data[root.pid];
        cbk(parent);
        traverseParent(parent.id, data, cbk);
    }
    else{
        cbk(null)
    }
}
const traverse = (rootId:string, data:{[id:string]:Node}, cbk:(node:Node) => void) => {
    let root = data[rootId];
    cbk(root);
    root.children.forEach(id => {
        let node = data[id];
        cbk(node)
    })
}
const createTree = (rootId:string, data:{[id:string]:any}):any => {
    let root = data[rootId];
    let expandedKeys:string[] = [];
    let treeNode: {[id:string]:any} = {
        id: root.id,
        title: root.name,
        children: [] as any[]
    }
    
    if(root.state.expanded)
    expandedKeys.push(root.id);

    if(root.matches)
    treeNode.matches = root.matches;

    root.children.forEach((id:string) => {
        let child = data[id]
        if(child)
        {
            let [node,expanded] = createTree(child.id,data);
            treeNode.children.push(node)
            expandedKeys = [...expandedKeys,...expanded];
        }
        
    })
    return [treeNode, expandedKeys]
}
export const getTreeData = (data:{[id:string]:Node}, results:Node[]) => {
    if(!data)
    return {}

    let treeData = [] as any[]
    let filteredData:{[id:string]:Node} = {}
    results.forEach(r => filteredData[r.id] = r);

    let expandedKeys:string[] = [];
    if(results.length > 0) {
        results.forEach(res => {
            traverse(res.id,data,(child) => {
                if(child && filteredData[child.id] === undefined)
                filteredData[child.id] = child
            })
            traverseParent(res.id,data,(parent) => {
                if(parent && filteredData[parent.id] === undefined)
                filteredData[parent.id] = parent
            })
        })
    }
        let input = results.length > 0 ? filteredData : data
        let rootNodes = Object.values(input).filter(node => node.pid === "-1");
        rootNodes.forEach(root => {
            let [node, expanded] = createTree(root.id,input)
            treeData.push(node);
            expandedKeys = [...expandedKeys,...expanded]
        })
        return {treeData,expandedKeys}
    
    
} 