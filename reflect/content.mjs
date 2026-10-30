// Original reflection prompts, not a validated questionnaire. Add future languages here.
export const content = {
  en: {
    title: 'A Moment to Reflect.', eyebrow: 'A LITTLE SPACE FOR YOU',
    intro: 'Sometimes, understanding ourselves begins with noticing what we feel.',
    invitation: 'Take a few moments to gently explore your emotional experiences. There’s no right or wrong answer, and nothing you need to figure out immediately.',
    meta: ['About 2–4 minutes · No time limit', 'Private and optional · No account', 'No scores or diagnoses'],
    disclaimer: 'This is a self-guided reflection exercise informed by principles of emotional awareness used in Emotion-Focused Therapy. It is not psychotherapy, a psychological assessment, or a substitute for professional mental health care.',
    gentle: 'Choose something that feels manageable to think about today. You do not need to revisit your most painful experience. You can reflect silently, skip any step, or stop at any time.',
    privacy: 'What you select or write stays only in this page’s temporary memory. It is not sent to the centre, saved between visits, or analysed by AI. Restarting, leaving, refreshing, or switching language clears it.',
    begin: 'Begin Reflection', next: 'Next', finish: 'Finish Reflection', back: 'Back', skip: 'Skip', exit: 'Stop & Clear',
    optional: 'Choose any that fit, write a little, or simply reflect silently. Everything is optional.',
    limit: 'Optional · Up to 1,000 characters. No names or identifying details are needed.',
    pause: 'If this feels too much, pause or stop. You can look around you, notice your surroundings, and reach out to someone you trust or a professional for support.',
    skipHint: 'Skip leaves this step blank and clears anything entered here.',
    closing: 'Thank you for taking a moment for yourself.',
    closingText: 'Not every feeling needs to be understood or resolved immediately. Sometimes, noticing what we’re experiencing, recognising what matters to us, and considering what we might need can be a meaningful starting point.',
    noPressure: 'You do not need to solve anything or change how you feel right now.',
    review: 'Review My Reflection', summary: 'Your Reflection', summaryNote: 'Only the words you selected or wrote. No interpretation has been added.',
    blank: 'Nothing recorded for this step.', silent: 'You chose not to record any responses. Reflecting silently is just as welcome.',
    again: 'Reflect Again', print: 'Print / Save My Reflection', selfChecks: 'Return to Self-Checks', support: 'Explore Professional Support',
    printHint: 'To save, choose “Save as PDF” in your browser’s print options. This creates a copy on your device; keep it private and use a private printer.',
    stopped: 'It’s okay to leave it here.', stoppedText: 'Your reflection has been cleared. You can return another time, or simply take a break.',
    steps: [
      { name:'Notice', title:'What am I feeling?', question:'When you think about something that has been difficult for you recently, what feelings do you notice?', choices:['Anxious or worried','Sad','Frustrated or angry','Lonely','Overwhelmed','Hurt','Confused','Calm or relieved','Something else','I’m not sure'], label:'Would you like to describe what you’re feeling in your own words?', reminder:'Sometimes feelings are clear. Other times, they’re difficult to identify. Both experiences are okay.', summary:'What I noticed' },
      { name:'Understand', title:'What matters to me?', question:'When you think about this experience, what feels most difficult or important to you?', choices:['Something feels uncertain.','I feel misunderstood.','I feel disconnected from someone.','I’m afraid something important might change.','I feel disappointed or let down.','I’m being hard on myself.','Something important to me feels missing.','I’m not sure yet.','Something else.'], label:'What feels particularly meaningful or difficult about this experience?', reminder:'These are invitations, not explanations of your experience. It is okay if none of them fit.', summary:'What matters to me' },
      { name:'Respond', title:'What might I need?', question:'If you could respond to yourself with a little more understanding right now, what might you need?', choices:['Rest or some space.','Comfort or reassurance.','To feel heard or understood.','Connection with someone.','More clarity.','A sense of safety.','Permission to feel what I’m feeling.','To set a boundary.','Time to process things.','I’m not sure yet.','Something else.'], label:'What might be one gentle thing you could offer yourself right now?', reminder:'You do not need to solve the situation or make your feelings change. Not knowing what you need is okay too.', summary:'What I might need' }
    ]
  },
  zh: {
    title:'留一点时间，听听自己。', eyebrow:'给自己一点空间',
    intro:'理解自己，有时从留意当下的感受开始。',
    invitation:'用几分钟，轻轻地靠近自己的感受。这里没有标准答案，也不需要马上想明白什么。',
    meta:['约 2–4 分钟 · 不限时间','自由选择 · 无需注册','没有评分，也不作诊断'],
    disclaimer:'这是一项自助情绪觉察练习，参考了情绪聚焦治疗（EFT）中关注情绪体验的原则。它不是心理治疗或心理评估，也不能替代专业心理健康服务。',
    gentle:'可以从一件今天想起来还承受得住的事情开始，不必回想最痛苦的经历。您可以只在心里想一想，跳过任何一步，或随时停止。',
    privacy:'您选择或写下的内容，只暂存在当前页面中，不会发送给中心、留存到下次访问，或交由 AI 分析。重新开始、离开、刷新页面或切换语言，都会清除这些内容。',
    begin:'开始觉察', next:'下一步', finish:'完成这次觉察', back:'上一步', skip:'跳过', exit:'停止并清除内容',
    optional:'可以选择贴近您的描述、写下几句话，或只在心里想一想。所有回答都是自愿的。',
    limit:'选填 · 最多 1,000 字符，无需填写姓名或可识别身份的信息。',
    pause:'如果觉得有些难以承受，可以暂停或停止。看看周围，留意自己此刻所处的环境，也可以向信任的人或专业人员寻求支持。',
    skipHint:'点击“跳过”会清除这一步已选或已填写的内容，并将其留空。',
    closing:'谢谢您，留了一点时间给自己。',
    closingText:'不是每一种感受，都需要马上被理解或解决。有时，留意自己的感受、看见自己在乎的事，再想想此刻可能需要什么，就可以是一个有意义的开始。',
    noPressure:'您不需要现在就解决问题，也不必勉强自己改变感受。',
    review:'回顾我的记录', summary:'这一次，我留意到……', summaryNote:'这里只整理您选择或写下的内容，不作心理解读。',
    blank:'这一步没有留下记录。', silent:'您没有留下文字或选项。在心里静静想一想，也是一种觉察。',
    again:'重新开始', print:'打印／保存我的记录', selfChecks:'返回心理自测', support:'了解专业支持',
    printHint:'如需保存，可在浏览器打印选项中选择“另存为 PDF”。副本会保存在您的设备上，请妥善保管，并使用私人的打印机。',
    stopped:'停在这里，也可以。', stoppedText:'您的记录已清除。可以改天再来，也可以先休息一下。',
    steps:[
      {name:'留意感受', title:'我现在有什么感受？', question:'想起最近一件让您不太好受的事，您留意到自己有什么感受？', choices:['焦虑或担心','难过','烦躁或生气','孤单','有些招架不住','受伤或委屈','困惑','平静或松了一口气','其他感受','还不太确定'], label:'愿意用自己的话，描述一下此刻的感受吗？', reminder:'有时，感受很清晰；有时，又说不上来。两种情况都没有关系。', summary:'我留意到的感受'},
      {name:'理解自己', title:'对我来说，什么很重要？', question:'在这件事里，什么让您最难受，或最在意？', choices:['有些事情还不确定。','我觉得自己没有被理解。','我感觉和某个人疏远了。','我担心重要的事物会改变。','我感到失望，或觉得被辜负了。','我对自己太苛刻了。','生活里好像少了某样重要的东西。','我还不太确定。','其他。'], label:'这段经历中，有什么对您特别重要，或特别难受？', reminder:'这些只是帮助您想一想的提示，不是在解释您的经历。如果都不贴切，也没有关系。', summary:'我在乎的事'},
      {name:'关照自己', title:'此刻，我可能需要什么？', question:'如果此刻能多给自己一点理解，您觉得自己可能需要什么？', choices:['休息，或一点自己的空间。','安慰或鼓励。','有人倾听和理解。','与人亲近、联系。','把事情看得更清楚一些。','多一点安全感。','允许自己有这些感受。','表达自己的界限。','一点时间，慢慢消化。','我还不太确定。','其他。'], label:'此刻，有没有一件小事，能让您温柔地照顾一下自己？', reminder:'不必急着解决事情，也不用勉强改变感受。暂时不知道自己需要什么，也可以。', summary:'我可能需要的支持'}
    ]
  }
};
