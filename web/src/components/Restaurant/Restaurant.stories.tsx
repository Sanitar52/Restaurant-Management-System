// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Restaurant from './Restaurant'




export const generated = () => {
  return (
    <Restaurant
      restaurant={{
        name: 'Rob Cameron',
        body: 'This is the first comment!',
        logo: 'TESTLOGO',
        description: 'test test description'
      }}
    />
  )
}

export default {
  title: 'Components/Restaurant',
  component: Restaurant,
} 


