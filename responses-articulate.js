// Find response in articulate training


console.log(parse(base64ToString(window.courseData)).course.lessons.reduce((acc, l) => acc.concat(l.items), []).filter(b => b.type === "knowledgeCheck").map(kc => kc.items[0].answers.filter(a => a.correct).map(a => kc.items[0].title.substr(0, 30) + '... : ' + a.title).join('\n')).join('\n---\n'))
