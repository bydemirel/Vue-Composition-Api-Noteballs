import { watch } from 'vue'

export function useWatchCharacters(valueToWatch, maxChars){
    watch(valueToWatch,(newValue) => {
        if(newValue.length === maxChars)
        {
          alert(`Only ${maxChars} characters allowed!`)
        }
      })
}