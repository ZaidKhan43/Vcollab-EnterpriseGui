let tree:any = [
    {
        id: "1",
        pid:null,
        title: "Bracket",
        state: {
            checked: true,
            partiallyChecked: true
        },
        children: [
            {
                id: "11",
                pid: "1",
                title: "Geometry",
                state: {
                    checked: true,
                    partiallyChecked: true,
                },
                children: [
                    {
                        id: "111",
                        pid: "11",
                        title: "Properties",
                        state: {
                            checked: true,
                            partiallyChecked: true,
                        },
                        children: [
                            {
                                id: "1111",
                                pid: "111",
                                title: "PSHELL_PID1",
                                state: {
                                    checked: true,
                                    partiallyChecked: false,
                                },
                                children: []
                            },
                            {
                                id: "1112",
                                pid: "111",
                                title: "PSHELL_PID2",
                                state: {
                                    checked: true,
                                    partiallyChecked: false,
                                },
                                children: []
                            },
                            {
                                id: "1113",
                                pid: "111",
                                title: "PSHELL_PID3",
                                state: {
                                    checked: false,
                                    partiallyChecked: false,
                                },
                                children: []
                            }

                        ]
                    }
                ]
            }
        ]
    }
]
export {tree}