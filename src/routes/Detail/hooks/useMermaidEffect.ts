import { useEffect } from "react"
import mermaid from "mermaid"

const useMermaidEffect = () => {
  useEffect(() => {
    let cancelled = false
    mermaid.initialize({ startOnLoad: false })
    const elements = Array.from(document.getElementsByClassName("language-mermaid"))

    const renderDiagrams = async () => {
      for (const [index, element] of elements.entries()) {
        try {
          const { svg, bindFunctions } = await mermaid.render(
            "mermaid" + index,
            element.textContent || ""
          )
          if (cancelled) return
          element.innerHTML = svg
          bindFunctions?.(element as HTMLElement)
        } catch (error) {
          console.error("Unable to render Mermaid diagram", error)
        }
      }
    }
    void renderDiagrams()
    return () => { cancelled = true }
  }, [])
}

export default useMermaidEffect
