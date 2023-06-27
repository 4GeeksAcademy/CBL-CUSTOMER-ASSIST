import React, { useState } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import { colourOptions } from '../data';

export const KnowledgeAssistanceReport = (props) => {
    const categoryOptions = props.categoryOptions;
    const knowledges = props.knowledges;
    const animatedComponents = makeAnimated();
    const [knowledgeFilter, setKnowledgeFilter] = useState([]);
    const [actionsTaken, setActionsTaken] = useState([]);
    const [editObservations, setEditObservations] = useState(false);
    const [observationsValue, setObservationsValue] = useState("");

    const handleFilters = (options) => {
        const filter = options.map((opt) => opt.value);
        setKnowledgeFilter(filter);
    }

    const handleAddKnowledgeToReport = (knowledge) => {
        if (!actionsTaken.includes(knowledge)) setActionsTaken(actionsTaken => [...actionsTaken, knowledge]);
    }

    const handleEditObservations = () => {
        setEditObservations(!editObservations);
    }

    return (
        <div className="mb-3">
            <h4 className="border-bottom">Assistance Report</h4>

            {/* MULTISELECT CATEGORIES */}
            <div className="d-flex mb-3">
                <div
                    className="input-group-text rounded-end-0"
                    style={{ background: "var(--bs-primary-bg-subtle)", color: "var(--bs-primary-text-emphasis)", borderColor: "var(--bs-primary-border-subtle)" }}>
                    Knowledge base
                </div>
                <Select
                    className="react-select-container w-100"
                    placeholder="Select categories..."
                    id="selectCategories"
                    closeMenuOnSelect={true}
                    blurInputOnSelect={true}
                    components={animatedComponents}
                    // defaultValue={[categoryOptions[0]]}
                    isMulti
                    options={categoryOptions}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            // borderColor: state.isFocused ? 'grey' : 'var(--bs-primary-border-subtle)',
                            borderColor: 'var(--bs-primary-border-subtle)',
                            borderRadius: '0 4px 4px 0'
                        }),
                    }}
                    onChange={(e) => handleFilters(e)}
                />
            </div>

            {/* FILTERED KNOWLEDGES */}
            <div>
                {knowledges.length > 0 ?
                    knowledges
                        .filter(knowledge => knowledgeFilter.includes(knowledge.category))
                        .map((knowledge) => {
                            return (
                                <ul className="list-group mb-3 shadow" key={knowledge.id}>

                                    {/* MALFUNCTION */}
                                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fw-medium p-1">
                                        Malfunction
                                        <span className="badge text-warning bg-dark rounded-pill">{knowledge.category}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fst-italic p-1">
                                        {knowledge.malfunction}
                                    </li>

                                    {/* SOLUTION */}
                                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fw-medium p-1">
                                        Solution
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fst-italic p-1">
                                        {knowledge.solution}
                                        <span
                                            className="btn badge text-bg-primary"
                                            onClick={() => handleAddKnowledgeToReport(knowledge)}
                                        >Add to report</span>
                                    </li>
                                </ul>
                            )
                        }) :
                    null
                }
            </div>

            {/* ACTIONS TAKEN */}
            {/* TODO: is there a way to do this below without having two actionsTaken.length? */}
            {/* The next line just need to be rendered one time */}
            {actionsTaken.length > 0 ? <h6 className="border-bottom">Actions taken</h6> : ""}
            {actionsTaken.length > 0 ?
                actionsTaken.map((action, i) => {
                    return (
                        <ul className={`list-group mb-3 ${knowledgeFilter.length > 0 ? "opacity-50" : null}`} key={action.id}>

                            {/* MALFUNCTION */}
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fw-medium p-1">
                                Malfunction
                                <span className="badge text-warning bg-dark rounded-pill">{action.category}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lh-1 fst-italic p-1">
                                {action.malfunction}
                            </li>

                            {/* SOLUTION */}
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fw-medium p-1">
                                Solution
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success lh-1 fst-italic p-1">
                                {action.solution}
                            </li>
                        </ul>
                    )
                }) :
                null
            }
            {/* OBSERVATIONS */}
            <div className="form-floating mb-1">
                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{ minHeight: "500px" }} disabled={!editObservations}></textarea>
                <label htmlFor="floatingTextarea">Observations...</label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input me-2"
                    checked={editObservations}
                    value={observationsValue}
                    onChange={() => handleEditObservations()}
                    type="checkbox"
                    id="editObservations"
                />
                <label className="form-check-label" htmlFor="editObservations">Edit Observations</label>
            </div>
        </div>
    );
}