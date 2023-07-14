import React, {useContext} from "react";
import { Context } from "../../store/appContext";

export const ProcessEquipmentInfoCard = () => {
  const { actions, store } = useContext(Context);
  const data = store.processTicket.equipment;

  return (
    <div className="mb-3">
      <h4 className="border-bottom">Equipment Information</h4>
      <div className="card mb-3 px-3 py-2">
        <div className="row g-0">
          {data.equipment_photo ?
          <div className="col-12 col-sm-4">
            <div className="img d-block d-sm-none w-100 rounded-top" style={{ "backgroundImage": `url('${data.equipment_photo}')` }}></div>
            <div className="img d-none d-sm-block w-100 rounded-start" style={{ "backgroundImage": `url('${data.equipment_photo}')` }}></div>
          </div>:
          null
          }
          <div className="col-12 col-sm-8">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">

                {/* MODEL */}
                <li className="list-group-item">
                  <p className="card-title"><strong>Model</strong>: {data.model}</p>
                </li>

                {/* SERIAL NUMBER */}
                <li className="list-group-item">
                  <p className="card-title"><strong>Serial Number</strong>: {data.serial_number}</p>
                </li>

                {/* IM109 */}
                <li className="list-group-item">
                  <p className="card-title"><strong>IM109</strong>: {data.im109}</p>
                </li>
                <li className="list-group-item text-center text-sm-end">
                  {data.knowledge.length > 0 ?
                    <button type="button" className="btn btn-primary"
                      data-bs-toggle="modal" data-bs-target="#processEquipmentHistoryModal"
                      style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}>
                      Equipment History
                    </button> :
                    <div>
                      <span className="badge text-bg-info">No historical available for this equipment!</span>
                    </div>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}