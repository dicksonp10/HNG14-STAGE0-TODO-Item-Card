
        // Due date: April 30, 2026, 23:59 UTC
        const dueDate = new Date(Date.UTC(2026, 3, 30, 23, 59, 0));
        
        const checkbox = document.getElementById('complete-toggle');
        const titleEl = document.getElementById('task-title');
        const descriptionEl = document.getElementById('task-description');
        const statusBadge = document.getElementById('status-badge');
        const metaContainer = document.getElementById('meta-container');
        const checkboxLabel = document.getElementById('checkbox-label');
        const timeRemainingSpan = document.getElementById('time-remaining');
        const dueDateSpan = document.getElementById('due-date');

        function formatDueDate(date) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `📅 Due ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
        }

        function getTimeRemainingText() {
            const now = new Date();
            const diffMs = dueDate - now;
            const diffMins = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffMs <= 0) {
                const overdueMins = Math.abs(diffMins);
                if (overdueMins < 60) return `⚠️ Overdue by ${overdueMins} min${overdueMins !== 1 ? 's' : ''}`;
                if (overdueMins < 1440) return `⚠️ Overdue by ${Math.floor(overdueMins / 60)} hour${Math.floor(overdueMins / 60) !== 1 ? 's' : ''}`;
                return `⚠️ Overdue by ${Math.floor(overdueMins / 1440)} day${Math.floor(overdueMins / 1440) !== 1 ? 's' : ''}`;
            }

            if (diffMins < 60) return diffMins <= 0 ? "⏰ Due now!" : `⏰ Due in ${diffMins} min${diffMins !== 1 ? 's' : ''}`;
            if (diffHours < 24) return `⏰ Due in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
            if (diffDays === 1) return "📆 Due tomorrow";
            return `📆 Due in ${diffDays} days`;
        }

        function updateTimeRemaining() {
            const remainingText = getTimeRemainingText();
            timeRemainingSpan.textContent = remainingText;
            if (remainingText.includes('Overdue')) {
                timeRemainingSpan.classList.add('overdue');
            } else {
                timeRemainingSpan.classList.remove('overdue');
            }
        }

        function updateTaskCompletion() {
            const isCompleted = checkbox.checked;

            if (isCompleted) {
                titleEl.classList.add('completed-title');
                descriptionEl.classList.add('completed-description');
                statusBadge.textContent = '✅ Done';
                statusBadge.className = 'status-badge status-done';
                statusBadge.setAttribute('aria-label', 'Status: Done');
                metaContainer.classList.add('completed-meta');
                const allTags = document.querySelectorAll('.tag');
                allTags.forEach(tag => {
                    tag.classList.add('completed-tag');
                });
                checkboxLabel.classList.add('completed-label');
            } else {
                titleEl.classList.remove('completed-title');
                descriptionEl.classList.remove('completed-description');
                statusBadge.textContent = '⏳ Pending';
                statusBadge.className = 'status-badge status-pending';
                statusBadge.setAttribute('aria-label', 'Status: Pending');
                metaContainer.classList.remove('completed-meta');
                const allTags = document.querySelectorAll('.tag');
                allTags.forEach(tag => {
                    tag.classList.remove('completed-tag');
                });
                checkboxLabel.classList.remove('completed-label');
                updateTimeRemaining();
            }
        }

        checkbox.addEventListener('change', updateTaskCompletion);

        const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
        editBtn.addEventListener('click', () => {
            console.log("Edit clicked for:", titleEl.textContent);
            alert(`✏️ Edit task: "${titleEl.textContent}"`);
        });

        const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');
        deleteBtn.addEventListener('click', () => {
            console.log("Delete clicked for:", titleEl.textContent);
            alert(`🗑️ Delete task: "${titleEl.textContent}"`);
        });

        dueDateSpan.textContent = formatDueDate(dueDate);
        dueDateSpan.setAttribute('datetime', dueDate.toISOString());
        updateTimeRemaining();
        setInterval(updateTimeRemaining, 30000);
        updateTaskCompletion();

        console.log("✅ Professional Todo Card ready with exact test IDs");