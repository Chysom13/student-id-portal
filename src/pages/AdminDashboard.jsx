import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase';

const AdminDashboard = ({ onLogout }) => {
    const [query, setQuery] = useState('');
    const [student, setStudent] = useState(null);
    const [searching, setSearching] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    // Guard: redirect to home if not authenticated
    useEffect(() => {
        if (sessionStorage.getItem('admin_session') !== 'true') {
            navigate('/');
        }
    }, [navigate]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        setStudent(null);
        setSearchError('');
        setSuccessMsg('');

        const { data, error } = await supabase
            .from('students')
            .select('id, name, matric_number, level, has_printed, last_printed_level')
            .eq('matric_number', query.trim())
            .single();

        setSearching(false);

        if (error || !data) {
            setSearchError('No student found with that Matric Number. Please double-check and try again.');
        } else {
            setStudent(data);
        }
    };

    const handleResetPrintLock = async () => {
        if (!student) return;
        setResetting(true);
        setSuccessMsg('');

        const { error } = await supabase
            .from('students')
            .update({ has_printed: false, last_printed_level: null })
            .eq('id', student.id);

        setResetting(false);

        if (!error) {
            setStudent(prev => ({ ...prev, has_printed: false, last_printed_level: null }));
            setSuccessMsg(`✅ Print lock has been successfully reset for ${student.name}. They can now reprint their ID card.`);
        } else {
            setSuccessMsg('❌ Failed to reset the print lock. Please try again.');
        }
    };

    const isPrintLocked = student?.has_printed || student?.last_printed_level === student?.level;

    return (
        <div style={{ minHeight: '60vh', background: '#f4f7fb' }}>
            {/* Header
            <div style={{
                background: 'linear-gradient(135deg, #12bca2, #6d15df)',
                padding: '16px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            }}>
                <div>
                    <h1 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: 800 }}>Admin Dashboard</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '13px' }}>Mountain Top University · ID System</p>
                </div>
            </div> */}

            {/* Body */}
            <div style={{ maxWidth: '680px', margin: '48px auto', padding: '0 20px' }}>
                <div style={{
                    background: '#2a0660',
                    color: 'white',
                    borderRadius: '16px',
                    padding: '36px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                }}>
                    <div style={{
                        margin: '0 0 28px 0',
                        textAlign: 'center'
                    }}>
                        <h1 style={{ fontSize: '25px', fontWeight: 800, textDecoration: 'underline' }}>Admin Dashboard</h1>
                        <p style={{ fontSize: '13px' }}>Mountain Top University · ID System</p>
                    </div>
                    <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 500 }}>Reset Print Lock</h2>
                    <p style={{ margin: '0 0 28px', fontSize: '14px' }}>
                        Search for a student by their Matric Number to view their print status and reset the lock if needed.
                    </p>

                    {/* Search */}
                    <form onSubmit={handleSearch} style={{ background: '#2a0660', marginBottom: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setSearchError(''); }}
                            placeholder="Enter Matric Number (e.g. MTU/20/1234)"
                            required
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                fontSize: '14px',
                                background: '#1e0446ff',
                                color: 'white',
                                border: '2px solid #444',
                                borderRadius: '8px',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                        <button
                            type="submit"
                            disabled={searching}
                            style={{
                                padding: '10px 24px',
                                background: '#12bca2',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 700,
                                fontSize: '14px',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                opacity: searching ? 0.7 : 1,
                            }}
                        >
                            {searching ? 'Searching...' : 'Search'}
                        </button>
                    </form>

                    {/* Error from search */}
                    {searchError && (
                        <div style={{ padding: '14px', background: '#fff3f3', border: '1px solid #fca5a5', borderRadius: '8px', color: '#b91c1c', fontSize: '14px', marginBottom: '20px' }}>
                            {searchError}
                        </div>
                    )}

                    {/* Student Result Card */}
                    {student && (
                        <div style={{
                            border: '2px solid #e8e8f0',
                            borderRadius: '12px',
                            padding: '24px',
                            background: 'black',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800 }}>{student.name}</h3>
                                    <p style={{ margin: '0 0 2px', fontSize: '14px' }}><strong>Matric No:</strong> {student.matric_number}</p>
                                    <p style={{ margin: '0 0 2px', fontSize: '14px' }}><strong>Current Level:</strong> {student.level}</p>
                                    <p style={{ margin: '0 0 2px', fontSize: '14px' }}><strong>Last Printed Level:</strong> {student.last_printed_level || 'Never printed'}</p>
                                </div>

                                <div style={{
                                    padding: '8px 14px',
                                    borderRadius: '999px',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                    background: isPrintLocked ? '#fff3cd' : '#d1fae5',
                                    color: isPrintLocked ? '#856404' : '#065f46',
                                    border: isPrintLocked ? '1px solid #ffd970' : '1px solid #6ee7b7',
                                }}>
                                    {isPrintLocked ? '🔒 Print Locked' : '✅ Can Print'}
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ marginTop: '20px', borderTop: '1px solid #e8e8f0', paddingTop: '20px' }}>
                                {isPrintLocked ? (
                                    <button
                                        onClick={handleResetPrintLock}
                                        disabled={resetting}
                                        style={{
                                            padding: '12px 24px',
                                            background: '#e53935',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontWeight: 700,
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {resetting ? 'Resetting...' : '🔓 Reset Print Lock'}
                                    </button>
                                ) : (
                                    <p style={{ color: '#0a8f69ff', fontWeight: 600, fontSize: '14px', margin: 0 }}>
                                        This student is currently eligible to print their ID card. No action needed.
                                    </p>
                                )}
                            </div>

                            {/* Success / Error message */}
                            {successMsg && (
                                <div style={{
                                    marginTop: '16px',
                                    padding: '14px',
                                    background: successMsg.startsWith('✅') ? '#d1fae5' : '#fff3f3',
                                    border: `1px solid ${successMsg.startsWith('✅') ? '#6ee7b7' : '#fca5a5'}`,
                                    borderRadius: '8px',
                                    color: successMsg.startsWith('✅') ? '#065f46' : '#b91c1c',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}>
                                    {successMsg}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
