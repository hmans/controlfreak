import styled from "@emotion/styled"
import { useRerender } from "@hmans/react-toolbox"
import { useEffect } from "react"
import { controller } from "./controller"

const DebugPane = styled.div({
  position: "fixed",
  right: "20px",
  top: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "1rem",
  th: {
    textAlign: "right"
  },
  td: {
    width: 100,
    textAlign: "right"
  }
})

export const DebugUI = () => {
  const rerender = useRerender()

  useEffect(() => {
    const id = setInterval(rerender, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <DebugPane>
      <table>
        <tbody>
          <tr>
            <th>Move X:</th>
            <td>{controller.controls.move.value.x.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Move Y:</th>
            <td>{controller.controls.move.value.y.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Aim X:</th>
            <td>{controller.controls.aim.value.x.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Aim Y:</th>
            <td>{controller.controls.aim.value.y.toFixed(2)}</td>
          </tr>
          <tr>
            <th>Fire:</th>
            <td>{controller.controls.fire.value ? "true" : "false"}</td>
          </tr>
        </tbody>
      </table>
    </DebugPane>
  )
}
