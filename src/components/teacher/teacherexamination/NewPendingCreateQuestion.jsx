
import React, { useState } from 'react';
import './newpendingcreatequestion.css';
import { IoClose, IoTrashOutline, IoAdd, IoGrid } from 'react-icons/io5';

export default function NewPendingCreateQuestion({ onClose }) {
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      title: "Section A",
      questions: [{ id: Date.now() + 1, showAnswer: false }]
    }
  ]);
  const addSection = () => {
    setSections(secs => {
      const nextIndex = secs.length; // 0-based
      const newSection = {
        id: Date.now(),
        title: `Section ${String.fromCharCode(65 + nextIndex)}`, // A, B, C, …
        questions: [{ id: Date.now() + 1, showAnswer: false }]
      };
      return [...secs, newSection];
    });
  };

  const [blocks, setBlocks] = useState([
    { id: Date.now(), showAnswer: false }
  ]);

  const addQuestion = secIdx => {
    setSections(ss =>
      ss.map((s, i) =>
        i === secIdx
          ? { ...s, questions: [...s.questions, { id: Date.now(), showAnswer: false }] }
          : s
      )
    );
  };

  const toggleAnswer = idx => {
    setBlocks(b => b.map((blk, i) => i === idx
      ? { ...blk, showAnswer: !blk.showAnswer }
      : blk
    ));
  };

  const removeQuestion = idx => {
    setBlocks(b => b.filter((_, i) => i !== idx));
  };

  return (
    <div className="newpendingcreatequestion-overlay">
      <div className="newpendingcreatequestion-modal">
        {/* header */}
        <div className="newpendingcreatequestion-header">
          <p className="newpendingcreatequestion-header-heading">Second Term</p>
          <button onClick={onClose}><IoClose size={24} /></button>
        </div>

        {/* body + toolbar */}
        <div className="newpendingcreatequestion-content">
          <div className="newpendingcreatequestion-body-wrapper" >
            <div className="newpendingcreatequestion-bodys">
              {sections.map((sec, sidx) => (
                <div key={sec.id} className="newpendingcreatequestion-section-block">
                  {/* SECTION HEADER */}
                  <div className="newpendingcreatequestion-section">
                    <input
                      type="text"
                      className="newpendingcreatequestion-section-title"
                      value={sec.title}
                      onChange={e => {
                        const newTitle = e.target.value;
                        setSections(ss =>
                          ss.map((s, i) =>
                            i === sidx ? { ...s, title: newTitle } : s
                          )
                        );
                      }}
                    />
                    <button className="newpendingcreatequestion-btn-trash" onClick={() => {
                      setSections(ss => ss.filter((_, i) => i !== sidx));
                    }}>
                      <IoTrashOutline size={20} />
                    </button>
                  </div>

                  {/* QUESTIONS IN THIS SECTION */}
                  {sec.questions.map((q, qidx) => (
                    <div key={q.id} className="newpendingcreatequestion-block">
                      <div className="newpendingcreatequestion-q-area">
                        <div className="newpendingcreatequestion-q-prefix">{qidx + 1})</div>
                        <textarea
                          className="newpendingcreatequestion-q-input"
                          placeholder="Type your Question here"
                        />
                        <button
                          className="newpendingcreatequestion-btn-trash q-trash"
                          onClick={() => {
                            setSections(ss =>
                              ss.map((s, i) =>
                                i === sidx
                                  ? {
                                    ...s,
                                    questions: s.questions.filter((_, jj) => jj !== qidx)
                                  }
                                  : s
                              )
                            );
                          }}
                        >
                          <IoTrashOutline size={20} />
                        </button>
                      </div>

                      <button
                        className="newpendingcreatequestion-answer-toggle"
                        onClick={() => {
                          setSections(ss =>
                            ss.map((s, i) => {
                              if (i !== sidx) return s;
                              return {
                                ...s,
                                questions: s.questions.map((qq, jj) =>
                                  jj === qidx
                                    ? { ...qq, showAnswer: !qq.showAnswer }
                                    : qq
                                )
                              };
                            })
                          );
                        }}
                      >
                        Answer Key
                      </button>

                      {q.showAnswer && (
                        <div className="newpendingcreatequestion-answer-block">
                          <textarea
                            className="newpendingcreatequestion-answer-input"
                            placeholder="Type your Answer here"
                          />
                          <div className="newpendingcreatequestion-answer-controls">
                            <button className="newpendingcreatequestion-btn-mark">Mark 0</button>
                            <button
                              className="newpendingcreatequestion-btn-trash"
                              onClick={() => {
                                // same remove logic as above…
                              }}
                            >
                              <IoTrashOutline size={20} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>
          {/* right-hand toolbar */}
          <div className="newpendingcreatequestion-toolbar">
            <button
              className="newpendingcreatequestion-toolbar-btn"
              onClick={() => addQuestion(sidx)}
            >
              <IoAdd size={24} />
            </button>
            <button className="newpendingcreatequestion-toolbar-btn"
              onClick={addSection}>
              <IoGrid size={24} />
            </button>
          </div>
        </div>

        {/* footer */}
        <div className="newpendingcreatequestion-footer">
          <button onClick={onClose}>Back</button>
          <button className="newpendingcreatequestion-clear">Clear</button>
          <button className="newpendingcreatequestion-save">Save</button>
        </div>
      </div>
    </div>
  );
}