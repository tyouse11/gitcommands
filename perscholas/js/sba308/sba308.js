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

function getLearnerData (course, ag, submissions) {
    // Validate if AssignmentGroup belongs to its Course
    try{
        if (ag.course_id !== course.id) {
            throw new Error ('Invalid input: AssignmentGroup does not match Course')
    }
    } catch (error) {
        console.error('An error occurred:', error.message)
    }

    const assignments = {};
        ag.assignments.forEach(assignment => {
        assignments[assignment.id] = assignment;
        });


    const learnersData = {}
  
    // Process learner submissions
    submissions.forEach((submission) => {
      const assignment = assignments[submission.assignment_id]
      if (!assignment) {
        return
      }
  
      // Check if assignment is already in the learner's data
      if (!learnersData[submission.learner_id]) {
        learnersData[submission.learner_id] = {
          id: submission.learner_id,
          totalWeightedScore: 0,
          totalWeight: 0,
          scores: {}
        }
      }
  
      const learner = learnersData[submission.learner_id]
      //console.log(learner)
      const dueDate = new Date(assignment.due_at)
      const submittedDate = new Date(submission.submission.submitted_at)
  
      // Calculate score considering late submission
      let pointsPossible
      if (assignment.points_possible !== 0) {
        pointsPossible = assignment.points_possible
      } else {
        pointsPossible = 1
      }

      let lateSubmissionPenalty
        if (submittedDate > dueDate) {
            lateSubmissionPenalty = pointsPossible * 0.1
        } else {
        lateSubmissionPenalty = 0
        }
        let adjustedScore = submission.submission.score - lateSubmissionPenalty;
        if (adjustedScore < 0) {
          adjustedScore = 0;
        }
  
      // Update learner's total weighted score and total weight
      learner.totalWeightedScore += (adjustedScore / pointsPossible) * pointsPossible
      learner.totalWeight += pointsPossible
  
      // Store assignment score for the learner
      learner.scores[submission.assignment_id] = adjustedScore / pointsPossible
    })
  
    // // Calculate averages and format output
    const result = Object.entries(learnersData).map(([learnerId, learner]) => {
    const avg = (learner.totalWeightedScore / learner.totalWeight) * 100 || 0
    
    const learnerData = { id: learner.id, avg }
        for (const [assignmentId, score] of Object.entries(learner.scores)) {
          learnerData[assignmentId] = score * 100; // Convert to percentage
        }
        return learnerData
      });
    
    return result;
    }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
  
  console.log(result)