// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  }
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  }
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ]

// Function to validate if AssignmentGroup belongs to its Course
function validateCourseAssignmentMatch(course, ag) {
    try{
        if (ag.course_id !== course.id) {
            throw new Error ('Invalid input: AssignmentGroup does not match Course')
    }
    } catch (error) {
        console.error('An error occurred:', error.message)
    }
  }
  
  // Function to create assignments object from AssignmentGroup
  function createAssignmentsObject(ag) {
    const assignments = {};
  
    for (const index in ag.assignments) {
      const assignment = ag.assignments[index];
      assignments[assignment.id] = assignment;
    }
  
    return assignments;
  }  

  // Function to process learner submissions
  function processSubmissions(assignments, submissions) {
    const learnersData = {};
  
    submissions.forEach(submission => {
      const assignment = assignments[submission.assignment_id];
      if (!assignment) return;
  
      if (!learnersData[submission.learner_id]) {
        learnersData[submission.learner_id] = {
          id: submission.learner_id,
          totalWeightedScore: 0,
          totalWeight: 0,
          scores: {}
        };
      }
  
      const learner = learnersData[submission.learner_id];
      const dueDate = new Date(assignment.due_at);
      const submittedDate = new Date(submission.submission.submitted_at);
  
      let pointsPossible = assignment.points_possible !== 0 ? assignment.points_possible : 1;
      let lateSubmissionPenalty = submittedDate > dueDate ? pointsPossible * 0.1 : 0;
      let adjustedScore = submission.submission.score - lateSubmissionPenalty;
      adjustedScore = adjustedScore < 0 ? 0 : adjustedScore;
  
      learner.totalWeightedScore += (adjustedScore / pointsPossible) * pointsPossible;
      learner.totalWeight += pointsPossible;
      learner.scores[submission.assignment_id] = adjustedScore / pointsPossible;
    });
  
    return learnersData;
  }
  
  // Function to calculate averages and format output
  function calculateAverages(learnersData) {
    const result = Object.entries(learnersData).map(([learnerId, learner]) => {
      const avg = (learner.totalWeightedScore / learner.totalWeight) * 100 || 0;
      const learnerData = { id: learner.id, avg };
  
      for (const [assignmentId, score] of Object.entries(learner.scores)) {
        learnerData[assignmentId] = score * 100; // Convert to percentage
      }
  
      return learnerData;
    });
  
    return result;
  }
  
  // Main function using the smaller functions
  function getLearnerData(course, ag, submissions) {
    validateCourseAssignmentMatch(course, ag);
    const assignments = createAssignmentsObject(ag);
    const learnersData = processSubmissions(assignments, submissions);
    return calculateAverages(learnersData);
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);
  